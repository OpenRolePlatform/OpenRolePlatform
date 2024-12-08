import { useCharacter } from '../services/useCharacter';

function Test() {
  const character = useCharacter('juan');

  return (
    <>
      <div>
        <button
          onClick={() =>
            character.updateStats({
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
