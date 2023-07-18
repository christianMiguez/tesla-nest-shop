export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (_, result) => void,
) => {
  if (!file) return callback(new Error('No file provided'), false);

  const fileExtension = file.mimetype.split('/')[1];

  if (['jpg', 'png', 'jpeg', 'gif'].includes(fileExtension))
    callback(null, true);

  callback(null, false);
};
