/** @jsxImportSource react */
/**
 * "Editar recorte" para los campos de imagen del panel. Envuelve el campo de
 * Keystatic (mismo guardado, misma ruta del archivo) y suma un botón que abre un
 * editor con el marco de la proporción con la que la foto se ve en el sitio: se
 * arrastra la foto y se acerca con el control de zoom. Al guardar, el archivo se
 * reemplaza por el recorte (JPG). Solo se carga en /keystatic.
 */
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import type { fields } from '@keystatic/core';
import { ActionButton, Button, ButtonGroup } from '@keystar/ui/button';
import { Dialog, DialogContainer } from '@keystar/ui/dialog';
import { Flex, VStack } from '@keystar/ui/layout';
import { Content } from '@keystar/ui/slots';
import { Heading, Text } from '@keystar/ui/typography';

type CampoImagen = ReturnType<typeof fields.image>;
type Imagen = { data: Uint8Array; extension: string; filename: string };

export type Recorte = {
  proporcion: number; // ancho / alto: 4 / 5, 4 / 3, 1200 / 630
  donde: string; // "la tarjeta de Novedades"
  guia?: { proporcion: number; texto: string }; // otra proporción dentro del marco (por ejemplo, el celular)
};

const ANCHO_MAXIMO_SALIDA = 2000;

export function conRecorte<C extends CampoImagen>(campo: C, recorte: Recorte): C {
  const InputOriginal = campo.Input;
  return {
    ...campo,
    Input(props) {
      return (
        <VStack gap="regular">
          <InputOriginal {...props} />
          {props.value && <BotonRecorte imagen={props.value} recorte={recorte} onChange={props.onChange} />}
        </VStack>
      );
    },
  };
}

function BotonRecorte({ imagen, recorte, onChange }: { imagen: Imagen; recorte: Recorte; onChange(v: Imagen): void }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <Flex gap="regular" alignItems="center" wrap>
      <ActionButton onPress={() => setAbierto(true)}>Editar recorte</ActionButton>
      <Text size="small" color="neutralSecondary">
        Se ve en {recorte.donde} ({formatoProporcion(recorte.proporcion)}).
      </Text>
      <DialogContainer onDismiss={() => setAbierto(false)}>
        {abierto && (
          <EditorRecorte
            imagen={imagen}
            recorte={recorte}
            onCancelar={() => setAbierto(false)}
            onGuardar={(nueva) => {
              onChange(nueva);
              setAbierto(false);
            }}
          />
        )}
      </DialogContainer>
    </Flex>
  );
}

function formatoProporcion(p: number) {
  const conocidas: [number, string][] = [
    [4 / 5, 'vertical 4:5'],
    [4 / 3, 'horizontal 4:3'],
    [16 / 10, 'horizontal 16:10'],
    [1200 / 630, 'horizontal 1200 × 630'],
    [1, 'cuadrada'],
  ];
  return conocidas.find(([v]) => Math.abs(v - p) < 0.01)?.[1] ?? `${p.toFixed(2)}:1`;
}

function EditorRecorte({
  imagen,
  recorte,
  onCancelar,
  onGuardar,
}: {
  imagen: Imagen;
  recorte: Recorte;
  onCancelar(): void;
  onGuardar(v: Imagen): void;
}) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [url, setUrl] = useState<string>();
  // Marco en pantalla: entra en 520 × 400 px respetando la proporción.
  const marcoAncho = Math.round(Math.min(520, 400 * recorte.proporcion));
  const marcoAlto = Math.round(marcoAncho / recorte.proporcion);
  const margen = 32; // se ve un poco de foto alrededor del marco, oscurecida

  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // esquina de la foto respecto del marco, en px de pantalla
  const arrastre = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const blob = new Blob([imagen.data as BlobPart], { type: imagen.extension === 'png' ? 'image/png' : undefined });
    const u = URL.createObjectURL(blob);
    setUrl(u);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = u;
    return () => URL.revokeObjectURL(u);
  }, [imagen]);

  const cubrir = img ? Math.max(marcoAncho / img.naturalWidth, marcoAlto / img.naturalHeight) : 1;
  const escala = cubrir * zoom;
  const ancho = img ? img.naturalWidth * escala : 0;
  const alto = img ? img.naturalHeight * escala : 0;

  // La foto siempre cubre el marco entero.
  const limitar = (x: number, y: number) => ({
    x: Math.min(0, Math.max(marcoAncho - ancho, x)),
    y: Math.min(0, Math.max(marcoAlto - alto, y)),
  });

  // Al cargar, centrada.
  useEffect(() => {
    if (img) setPos({ x: (marcoAncho - img.naturalWidth * cubrir) / 2, y: (marcoAlto - img.naturalHeight * cubrir) / 2 });
  }, [img]);

  // El zoom acerca hacia el centro del marco.
  function cambiarZoom(nuevo: number) {
    const cx = (marcoAncho / 2 - pos.x) / escala;
    const cy = (marcoAlto / 2 - pos.y) / escala;
    const e = cubrir * nuevo;
    setZoom(nuevo);
    setPos(
      ((x, y) => ({
        x: Math.min(0, Math.max(marcoAncho - img!.naturalWidth * e, x)),
        y: Math.min(0, Math.max(marcoAlto - img!.naturalHeight * e, y)),
      }))(marcoAncho / 2 - cx * e, marcoAlto / 2 - cy * e),
    );
  }

  function alPresionar(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    arrastre.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  }
  function alMover(e: ReactPointerEvent<HTMLDivElement>) {
    const a = arrastre.current;
    if (!a) return;
    setPos(limitar(a.px + e.clientX - a.x, a.py + e.clientY - a.y));
  }
  function alTeclear(e: KeyboardEvent<HTMLDivElement>) {
    const paso = e.shiftKey ? 40 : 10;
    const d = { ArrowLeft: [paso, 0], ArrowRight: [-paso, 0], ArrowUp: [0, paso], ArrowDown: [0, -paso] }[e.key];
    if (!d) return;
    e.preventDefault();
    setPos(limitar(pos.x + d[0]!, pos.y + d[1]!));
  }

  // Tamaño final en px de la foto original.
  const recorteAncho = img ? Math.round(marcoAncho / escala) : 0;
  const salidaAncho = Math.min(recorteAncho, ANCHO_MAXIMO_SALIDA);
  const salidaAlto = Math.round(salidaAncho / recorte.proporcion);

  async function guardar() {
    if (!img) return;
    setGuardando(true);
    const canvas = document.createElement('canvas');
    canvas.width = salidaAncho;
    canvas.height = salidaAlto;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, -pos.x / escala, -pos.y / escala, marcoAncho / escala, marcoAlto / escala, 0, 0, salidaAncho, salidaAlto);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.9));
    setGuardando(false);
    if (!blob) return;
    onGuardar({
      data: new Uint8Array(await blob.arrayBuffer()),
      extension: 'jpg',
      filename: imagen.filename.replace(/\.[^.]+$/, '') + '.jpg',
    });
  }

  const guiaAncho = recorte.guia ? Math.min(marcoAncho, marcoAlto * recorte.guia.proporcion) : 0;
  const guiaAlto = recorte.guia ? guiaAncho / recorte.guia.proporcion : 0;

  return (
    <Dialog size="large">
      <Heading>Editar recorte</Heading>
      <Content>
        <VStack gap="large" alignItems="center">
          <Text>
            Arrastrá la foto para elegir qué parte se ve en {recorte.donde}. Con el zoom la acercás. También se mueve con las flechas
            del teclado.
          </Text>
          <div
            style={{
              position: 'relative',
              width: marcoAncho + margen * 2,
              height: marcoAlto + margen * 2,
              overflow: 'hidden',
              borderRadius: 8,
              background: '#1f2421',
              touchAction: 'none',
              cursor: 'grab',
              userSelect: 'none',
            }}
            tabIndex={0}
            role="application"
            aria-label="Recorte de la foto. Usá las flechas para moverla."
            onPointerDown={alPresionar}
            onPointerMove={alMover}
            onPointerUp={() => (arrastre.current = null)}
            onPointerCancel={() => (arrastre.current = null)}
            onKeyDown={alTeclear}
          >
            {url && img && (
              <img
                src={url}
                alt=""
                draggable={false}
                style={{ position: 'absolute', left: margen + pos.x, top: margen + pos.y, width: ancho, height: alto, maxWidth: 'none' }}
              />
            )}
            {/* Marco: lo de afuera queda oscurecido. */}
            <div
              style={{
                position: 'absolute',
                left: margen,
                top: margen,
                width: marcoAncho,
                height: marcoAlto,
                boxShadow: '0 0 0 9999px rgba(15, 20, 16, 0.6)',
                outline: '2px solid #fff',
                pointerEvents: 'none',
              }}
            >
              {recorte.guia && (
                <div
                  style={{
                    position: 'absolute',
                    left: (marcoAncho - guiaAncho) / 2,
                    top: (marcoAlto - guiaAlto) / 2,
                    width: guiaAncho,
                    height: guiaAlto,
                    outline: '2px dashed rgba(255, 255, 255, 0.85)',
                  }}
                />
              )}
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, width: Math.min(marcoAncho, 360) }}>
            <Text>Zoom</Text>
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              disabled={!img}
              onChange={(e) => cambiarZoom(Number(e.currentTarget.value))}
              style={{ flex: 1 }}
            />
          </label>
          <VStack gap="small" alignItems="center">
            {recorte.guia && <Text size="small">La línea punteada marca {recorte.guia.texto}.</Text>}
            {img && (
              <Text size="small" color={salidaAncho < 800 ? 'critical' : 'neutralSecondary'}>
                La foto va a quedar de {salidaAncho} × {salidaAlto} px.
                {salidaAncho < 800 && ' Es chica: puede verse borrosa. Probá con menos zoom o con una foto más grande.'}
              </Text>
            )}
            <Text size="small" color="neutralSecondary">
              Se guarda solo la parte recortada. Para recortar de nuevo con más margen, volvé a subir la foto original.
            </Text>
          </VStack>
        </VStack>
      </Content>
      <ButtonGroup>
        <Button onPress={onCancelar}>Cancelar</Button>
        <Button prominence="high" onPress={guardar} isDisabled={!img || guardando}>
          Usar este recorte
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
