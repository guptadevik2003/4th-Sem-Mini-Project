const Jimp = require('jimp');
const templateData = require('./templateData');

function getHorizontalCenter(image, font, text) {
  return (image.getWidth() - Jimp.measureText(font, text)) / 2;
}

function getDateCenter(left, right, font, text) {
  return left + ((right - left - Jimp.measureText(font, text)) / 2);
}

function getSignatureCenter(position, font, text) {
  return position - (Jimp.measureText(font, text) / 2);
}

module.exports = async ({ template, title, name="John Doe", description, date, signature }) => {

  // Getting Current Template Data
  const CTD = templateData[template];

  // Loading Certificate Template
  const certificate = await Jimp.read(CTD.templatePath);

  // Loading Fonts
  const titleFont = await Jimp.loadFont(CTD.title.fontPath);
  const nameFont = await Jimp.loadFont(CTD.name.fontPath);
  const descriptionFont = await Jimp.loadFont(CTD.description.fontPath);
  const dateFont = await Jimp.loadFont(CTD.date.fontPath);
  const signatureFont = await Jimp.loadFont(CTD.signature.fontPath);
  const signNameFont = await Jimp.loadFont(CTD.signName.fontPath);
  
  // Printing Title
  title = title.split('\n');
  await certificate.print(
    titleFont,
    getHorizontalCenter(certificate, titleFont, title[0]),
    CTD.title.vPos,
    title[0],
  );
  if(title[1]) {
    await certificate.print(
      titleFont,
      getHorizontalCenter(certificate, titleFont, title[1]),
      CTD.title.vPos + CTD.title.offset,
      title[1],
    );
  }

  // Printing Name
  await certificate.print(
    nameFont,
    getHorizontalCenter(certificate, nameFont, name),
    CTD.name.vPos,
    name,
  );

  // Printing Description
  await description.split('\n').forEach(async (str, ind) => {
    await certificate.print(
      descriptionFont,
      getHorizontalCenter(certificate, descriptionFont, str),
      CTD.description.vPos + (ind * CTD.description.offset),
      str,
    );
  });

  // Printing Date
  date = `Date: ${date}`;
  await certificate.print(
    dateFont,
    getDateCenter(CTD.date.lPos, CTD.date.rPos, dateFont, date),
    CTD.date.vPos,
    date,
  );

  // Printing Signature
  await certificate.print(
    signatureFont,
    getSignatureCenter(CTD.signature.hPos, signatureFont, signature),
    CTD.signature.vPos,
    signature,
  );

  // Printing Signature Name
  await certificate.print(
    signNameFont,
    getSignatureCenter(CTD.signName.hPos, signNameFont, signature),
    CTD.signName.vPos,
    signature,
  );

  // Returning Image Buffer
  return certificate.getBufferAsync(Jimp.MIME_PNG);

}
