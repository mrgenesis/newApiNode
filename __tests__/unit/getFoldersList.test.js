const path = require('path')

  , fs = require('fs')

  , crypto = require('crypto')

  , randomNumberInteger = require(
    path.join(__dirname, '..', '..', 'src', 'utils', 'randomNumberInteger'))

  , getFoldersList = require(
    path.join(__dirname, '..', '..', 'src', 'utils', 'getFoldersList'));

describe('getFoldersList', () => {
  it('deve retornar um objeto {names: [], paths: []}', () => {
    const newFolderTest = crypto.randomBytes(5).toString('hex')
      , getMinMaxRandomNumber = { min: randomNumberInteger(4), max: randomNumberInteger(12, 7) }
      , pathNewFolder = path.join(__dirname, 'newFolderTest-' + newFolderTest)
      , folderOrFileName = { toAdd: '', folders: [], files: [] };

    let count = getMinMaxRandomNumber.min;
    fs.mkdirSync(pathNewFolder);

    while (count <= getMinMaxRandomNumber.max) {
      folderOrFileName.toAdd = path.join(pathNewFolder, crypto.randomBytes(7).toString('hex'));
      if (randomNumberInteger() % 2 === 0) {
        fs.writeFileSync(folderOrFileName.toAdd, 'content put dynamiclly: ' + folderOrFileName.toAdd)
        folderOrFileName.files.push(folderOrFileName.toAdd);
      } else {
        fs.mkdirSync(folderOrFileName.toAdd);
        folderOrFileName.folders.push(folderOrFileName.toAdd);
      }
      ++count;
    }
    const foldersList = getFoldersList(pathNewFolder);
    folderOrFileName.joinFoldersNames = folderOrFileName.folders.join('-');

    expect(foldersList).toHaveProperty('names');
    expect(foldersList).toHaveProperty('paths');
    expect(foldersList.paths.length).toBe(folderOrFileName.folders.length);
    expect(foldersList.paths.every(folder =>
      folderOrFileName.joinFoldersNames.indexOf(folder) > -1)).toBe(true);
    expect(foldersList.names.every(folderName =>
      folderOrFileName.joinFoldersNames.indexOf(folderName) > -1)).toBe(true);
    fs.rmSync(pathNewFolder, { recursive: true });
  })
})