//react imports
//@mui imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
//components imports

const mainLogo = '/logo.png';

const classLogos = [
  '/img/fighter_logo.png',
  '/img/paladin_logo.png',
  '/img/warlock_logo.png',
  '/img/bloodhunter_logo.png',
];

const mainLogoStyle = {
  width: window.innerHeight > window.innerWidth ? '50vw' : '50vh',
};

const classLogoStyle = {
  marginTop: '7vw',
  marginBottom: '-10vw',
  width: '27.5vw',
};

const characterFontSize = '6vw';

export default function LandingPage() {
  function handleCharacterSelection(character: string) {
    localStorage.setItem('character', character);
    window.location = '/character';
  }

  return (
    <>
      {/* tile, image and sub-title */}
      <Stack direction="column" sx={{ width: '100%' }}>
        <Box sx={{ alignSelf: 'center' }}>
          <h1 style={{ fontSize: '10vw' }}>YmeriaDos</h1>
        </Box>
        <Box sx={{ alignSelf: 'center' }}>
          <img src={mainLogo} style={mainLogoStyle} alt="logo" />
        </Box>
        <Box sx={{ alignSelf: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '5vw' }}>La corona del hombre muerto</h3>
        </Box>
        <Divider sx={{ margin: '0% 2% 0% 2%' }} />
      </Stack>
      {/* characters main stack */}
      <Stack direction="column" sx={{ width: '100%' }}>
        {/* first character's row */}
        <Stack
          direction="row"
          sx={{ width: '100%', height: '40vw', margin: '2% 0% 2% 0%' }}
        >
          <Button
            variant="outlined"
            sx={{ width: '46%', height: '100%', margin: '2%' }}
            onClick={() => handleCharacterSelection('raven')}
          >
            <Box>
              <img src={classLogos[0]} style={classLogoStyle} alt="fighter" />
              <p style={{ fontSize: `${characterFontSize}` }}>Raven</p>
            </Box>
          </Button>
          <Button
            variant="outlined"
            sx={{ width: '46%', height: '100%', margin: '2%' }}
            onClick={() => handleCharacterSelection('amadeus')}
          >
            <Box>
              <img src={classLogos[1]} style={classLogoStyle} alt="paladin" />
              <p style={{ fontSize: `${characterFontSize}` }}>Amadeus</p>
            </Box>
          </Button>
        </Stack>
        {/* second character's row */}
        <Stack
          direction="row"
          sx={{ width: '100%', height: '40vw', margin: '2% 0% 6% 0%' }}
        >
          <Button
            variant="outlined"
            sx={{ width: '46%', height: '100%', margin: '2%' }}
            onClick={() => handleCharacterSelection('ozymandias')}
          >
            <Box>
              <img src={classLogos[2]} style={classLogoStyle} alt="warlock" />
              <p style={{ fontSize: `${characterFontSize}` }}>Ozymandias</p>
            </Box>
          </Button>
          <Button
            variant="outlined"
            sx={{ width: '46%', height: '100%', margin: '2%' }}
            onClick={() => handleCharacterSelection('aalis')}
          >
            <Box>
              <img
                src={classLogos[3]}
                style={classLogoStyle}
                alt="bloodhunter"
              />
              <p style={{ fontSize: `${characterFontSize}` }}>Aalis</p>
            </Box>
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
