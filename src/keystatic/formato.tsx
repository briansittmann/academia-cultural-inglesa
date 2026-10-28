/** @jsxImportSource react */
/**
 * Filtro de formato para los campos de imagen del panel. Keystatic deja elegir
 * cualquier imagen, pero astro:assets no procesa HEIC (las fotos de iPhone
 * pasadas a la Mac), BMP ni TIFF, y una sola foto así hace fallar el build. Al
 * subir una, se rechaza y se explica cómo pasarla a JPG. Solo se carga en /keystatic.
 */
import { useState } from 'react';
import type { fields } from '@keystatic/core';
import { VStack } from '@keystar/ui/layout';
import { Text } from '@keystar/ui/typography';
import { FORMATOS_DE_FOTO } from '../lib/validaciones';

type CampoImagen = ReturnType<typeof fields.image>;

const formatoValido = (extension: string) => FORMATOS_DE_FOTO.includes(extension.toLowerCase());

const mensaje = (extension: string) =>
  `Esta foto está en ${extension.toUpperCase() || 'un formato desconocido'} y la web no la puede mostrar. ` +
  'Subila en JPG, PNG o WebP. En la Mac: abrila con Vista Previa, Archivo > Exportar y elegí JPEG.';

export function soloFormatosWeb<C extends CampoImagen>(campo: C): C {
  const InputOriginal = campo.Input;
  return {
    ...campo,
    Input(props) {
      const [rechazada, setRechazada] = useState<string | null>(null);
      return (
        <VStack gap="regular">
          <InputOriginal
            {...props}
            onChange={(valor) => {
              if (valor && !formatoValido(valor.extension)) {
                setRechazada(valor.extension);
                return;
              }
              setRechazada(null);
              props.onChange(valor);
            }}
          />
          {rechazada !== null && (
            <Text size="small" color="critical">
              {mensaje(rechazada)}
            </Text>
          )}
        </VStack>
      );
    },
    // Por si la foto llega por otro camino (un archivo cargado a mano): no deja guardar.
    validate(valor) {
      const validado = campo.validate(valor);
      if (validado && !formatoValido(validado.extension)) throw new Error(mensaje(validado.extension));
      return validado;
    },
  };
}
