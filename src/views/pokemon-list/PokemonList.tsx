import { useState, ChangeEvent } from 'react';
import { NewFeatureAlert } from '../../NewFeatureAlert';
import { PokemonGender, PokemonListItem } from '../../models';
import { PokemonListItemDetails } from './PokemonListItemDetails';
import { DEFAULT_FILTERS, usePokemonList } from './usePokemonList';
import { useTranslation } from 'react-i18next';
import './pokemon-list.css';

export const PokemonList = () => {
  const { tagsAvailable, filteredPokemon, limit, pokemons, setLimit, setPokemons, filters, setFilters } =
    usePokemonList();
  const { t, i18n } = useTranslation(['list', 'common']);

  const [hasDiscoveredFav, setHasDiscoveredFav] = useState(false);

  const handlePokemonClick = (pokemonId: number) => {
    setHasDiscoveredFav(true);

    const newPokemonsMap = pokemons.map((pokemonInfo: PokemonListItem) => {
      if (pokemonId === pokemonInfo.id) {
        const newPokemonInfo = { ...pokemonInfo };
        newPokemonInfo.isFav = !pokemonInfo.isFav;
        return newPokemonInfo;
      }

      return pokemonInfo;
    });

    setPokemons(newPokemonsMap);
  };

  const handleHidePokemonClick = (pokemonId: number) => {
    const newPokemonsMap = pokemons.map((pokemonInfo: PokemonListItem) => {
      if (pokemonId === pokemonInfo.id) {
        const newPokemonInfo = { ...pokemonInfo };
        newPokemonInfo.isHidden = true;
        return newPokemonInfo;
      }

      return pokemonInfo;
    });

    setPokemons(newPokemonsMap);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((state) => ({ ...state, search: event.target.value }));
  };

  const handleClearClick = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  };

  const handleIsOnlyFavClick = () => {
    setFilters((state) => ({ ...state, isOnlyFavs: !filters.isOnlyFavs }));
  };

  const handleOnTagChanged = (isSelected: boolean, tag: string) => {
    const { tags = [] } = filters;
    const newTags = [...tags];

    if (isSelected) {
      newTags.push(tag);
    } else {
      const index = tags.indexOf(tag);

      newTags.splice(index, 1);
    }

    setFilters((state) => ({ ...state, tags: newTags }));
  };

  const handleOnGenderChange = (isSelected: boolean, genderChanged: PokemonGender) => {
    const { gender = [] } = filters;
    const newGender = [...gender];

    if (isSelected) {
      newGender.push(genderChanged);
    } else {
      const index = gender.indexOf(genderChanged);

      newGender.splice(index, 1);
    }

    setFilters((state) => ({ ...state, gender: newGender }));
  };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({ ...prevFilters, minPrice: Number(event.target.value) }));
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({ ...prevFilters, maxPrice: Number(event.target.value) }));
  };

  return (
    <>
      <div className="mt-10 mb-10 flex justify-end">
        {t('list:pluralizationExample', { count: filters.tags?.length ?? 0 })}

        {/* <button onClick={() => i18n.changeLanguage('es')}>Change to spanish</button> */}
        <select onChange={handleLimitChange} value={limit}>
          <option>5</option>
          <option>50</option>
          <option>100</option>
          <option>250</option>
          <option>500</option>
          <option value="5000">{t('list:all')}</option>
        </select>
      </div>
      <div className="flex  gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input placeholder="min price" type="number" value={filters.minPrice} onChange={handleMinPriceChange} />
            <input placeholder="max price" type="number" value={filters.maxPrice} onChange={handleMaxPriceChange} />
          </div>
          <input
            onChange={handleSearchInputChange}
            value={filters.search}
            placeholder={t('list:filters.searchPlaceholder')}
          />

          <div className="mb-2">
            <p className="font-bold">{t('list:filters.tags')}</p>
            <div className="flex flex-wrap gap-4">
              {tagsAvailable.map((tag) => (
                <label key={tag} className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(filters.tags?.includes(tag))}
                    onChange={(event) => handleOnTagChanged(event.target.checked, tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <p className="font-bold">Gender</p>
            <div className="flex flex-wrap gap-4">
              {Object.values(PokemonGender).map((gender) => (
                <label key={gender}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(event) => handleOnGenderChange(event.target.checked, gender)}
                  />
                  {t(`list:filters.genderOptions.${gender}`)}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleIsOnlyFavClick}
            style={{ color: filters.isOnlyFavs ? 'red' : 'black', cursor: 'pointer' }}
          >
            Only favs
          </button>
          <button onClick={handleClearClick}>limpiar</button>
        </div>
        <div className="pokemons">
          {!hasDiscoveredFav && <NewFeatureAlert />}
          {filteredPokemon.map((pokemon: PokemonListItem) => (
            <PokemonListItemDetails
              key={pokemon.id}
              pokemon={pokemon}
              onFavPokemonClick={handlePokemonClick}
              onHidePokemonClick={handleHidePokemonClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};
