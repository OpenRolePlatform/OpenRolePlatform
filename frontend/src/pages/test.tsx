import { useCharacter } from '../services/CharacterServices';

function Test() {
  const character = useCharacter('juan');

  return (
    <>
      <div
        className=""
        /*  style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }} */
      >
        <button
          onClick={() =>
            character.updateCharacter({
              ...character.stats(),
              strength: character.stats().strength + 1,
            })
          }
        >
          update strength
        </button>
        <div className="">{JSON.stringify(character.stats())}</div>

        <div className="">{character.loading && 'loading...'}</div>
      </div>
    </>
  );
}

export default Test;
