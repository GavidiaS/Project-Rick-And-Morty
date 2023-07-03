import axios from 'axios';

async function getApi(url, results = [], i = 0) {
  try {
    i += 1;
    const { data } = await axios(url);
    results = results.concat(data.results);
    if (i === 10) return results;
    if (data.info.next) return getApi(data.info.next, results, i);
    return results;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getCharacters() {
  try {
    const characters = await getApi("https://rickandmortyapi.com/api/character");
    const listCharacters = characters.map(ch => {
      return {
        id: ch.id,
        name: ch.name,
        status: ch.status,
        species: ch.species,
        origin: ch.origin.name,
        image: ch.image,
        gender: ch.gender,
        location: ch.location.name
      }
    });
    return listCharacters;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getCharactersByName(name) {
  try {
    const characters = await getApi(`https://rickandmortyapi.com/api/character?name=${name}`);
    if (characters.error) return { message: "Characters not found" };
    const listCharacters = characters.map(ch => {
      return {
        id: ch.id,
        name: ch.name,
        status: ch.status,
        species: ch.species,
        origin: ch.origin.name,
        image: ch.image,
        gender: ch.gender,
        location: ch.location.name
      }
    });
    return listCharacters;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getAllCharacters(req, res) {
  try {
    const { name } = req.query;
    const data = (name && /^[a-zA-Z\s]+$/.test(name))
    ? await getCharactersByName(name)
    : await getCharacters();
    if (data.message) return res.status(404).json({ message: data.message });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getCharacterById(req, res) {
  try {
    const { id } = req.params;
    const { data } = await axios(`https://rickandmortyapi.com/api/character/${id}`);
    if (!data.name) return res.status(404).json({ message: "Data not found" });
    const character = {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      origin: data.origin?.name,
      image: data.image,
      gender: data.gender,
      location: data.location?.name
    };
    return res.status(200).json(character);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}