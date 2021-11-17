/* eslint-disable jsx-a11y/label-has-associated-control */
import { Image } from '@mui/icons-material';
import { Grid, ImageList, ImageListItem, Button } from '@mui/material';
import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { IProperty } from 'src/types/Property';

interface IParams {
  editedProperty: IProperty;
  newImagesFiles: FileList | undefined;
  setNewImagesFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}

const PropertyImage: FC<IParams> = ({ editedProperty, newImagesFiles, setNewImagesFiles }) => {
  const [imageTemporaryUrls, setImageTemporaryUrls] = useState<string[]>([]);

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImagesFiles(event.target.files);
    }
  };

  useEffect(() => {
    if (newImagesFiles) {
      const urls: string[] = [];

      for (let i = 0; i < newImagesFiles.length; i += 1) {
        urls.push(URL.createObjectURL(newImagesFiles[i]));
      }
      setImageTemporaryUrls(urls);
    }
  }, [newImagesFiles]);

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" component="label" startIcon={<Image />}>
          Adicionar imagem
          <input
            hidden
            accept="image/jpeg"
            id="image-upload"
            type="file"
            onChange={handleUploadImage}
            multiple
          />
        </Button>
      </Grid>
      <Grid xs={12} padding={1} item container alignItems="flex-start">
        <ImageList cols={2}>
          {imageTemporaryUrls.map((item) => (
            <ImageListItem key={item}>
              <img src={item} srcSet={item} alt="" loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>

        <ImageList cols={2}>
          {editedProperty.imagens.map((item) => (
            <ImageListItem key={item}>
              <img src={item} srcSet={item} alt="" loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  );
};

export default memo(PropertyImage);
