import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import {
  ais_img,
  life_img_border,
  life_mod_img_border,
  player_img,
  skills_img,
  stats_img,
} from '../../assets/Images';
import { CharacterService } from '../../services/useCharacter';
import { getBonusValue } from '../../utils/data';

const stats_img_style = {
  height: '100%',
  width: '100%',
};
/* 
function checkIfLifePoolNeeded() {
  if (localStorage.getItem('character') === 'amadeus') {
    return (
      <Box width="100%" justifyContent="center" marginTop="0px">
        <Box display="flex" justifyContent="center">
          <Button
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              margin: '-7%',
              height: '100%',
            }}
            onClick={() => handleHpSelect('normal')}
          >
            <img src={life_img} style={{ width: '100%' }} alt="life" />
          </Button>
          <TextField
            variant="standard"
            inputProps={{ style: { textAlign: 'center', fontSize: '7vw' } }}
            sx={{
              position: 'absolute',
              width: '10%',
              alignSelf: 'center',
              zIndex: 2,
            }}
            onChange={handleHpChange}
            value={hp.hp}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Box display="flex" justifyContent="center" alignSelf="center">
            <Button
              style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                height: '100%',
              }}
              onClick={() => handleHpSelect('temp')}
            >
              <img
                src={life_temp_img}
                style={{ width: '12.5vw' }}
                alt="life_temp"
              />
            </Button>
            <TextField
              variant="standard"
              inputProps={{ style: { textAlign: 'center', fontSize: '5vw' } }}
              sx={{
                position: 'absolute',
                width: '7%',
                alignSelf: 'center',
                zIndex: 2,
              }}
              onChange={handleHpTempChange}
              value={hp.hpTemp}
            />
          </Box>
          <Box margin="-10px" />
          <Box display="flex" justifyContent="center" alignSelf="center">
            <Button
              style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                height: '100%',
              }}
              onClick={() => handleHpSelect('pool')}
            >
              <img
                src={life_pool_img}
                style={{ width: '12.5vw' }}
                alt="life_temp"
              />
            </Button>
            <TextField
              variant="standard"
              inputProps={{ style: { textAlign: 'center', fontSize: '5vw' } }}
              sx={{
                position: 'absolute',
                width: '7%',
                alignSelf: 'center',
                zIndex: 2,
              }}
              onChange={handleHpPoolChange}
              value={hp.hpPool}
            />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box width="100%" justifyContent="center" marginTop="0px">
        <Box display="flex" justifyContent="center" alignSelf="center">
          <Button
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              margin: '-7%',
              height: '100%',
            }}
            onClick={() => handleHpSelect('normal')}
          >
            <img src={life_img} style={{ width: '100%' }} alt="life" />
          </Button>
          <TextField
            variant="standard"
            inputProps={{ style: { textAlign: 'center', fontSize: '7vw' } }}
            sx={{
              position: 'absolute',
              width: '10%',
              alignSelf: 'center',
              zIndex: 2,
            }}
            onChange={handleHpChange}
            value={hp.hp}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignSelf="center">
          <Button
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              margin: '-7%',
              height: '100%',
            }}
            onClick={() => handleHpSelect('temp')}
          >
            <img src={life_temp_img} style={{ width: '80%' }} alt="life_temp" />
          </Button>
          <TextField
            variant="standard"
            inputProps={{ style: { textAlign: 'center', fontSize: '5vw' } }}
            sx={{
              position: 'absolute',
              width: '10%',
              alignSelf: 'center',
              zIndex: 2,
            }}
            onChange={handleHpTempChange}
            value={hp.hpTemp}
          />
        </Box>
      </Box>
    );
  }
} */

export function LeftStats(props: {
  character: CharacterService;
  handleUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { character, handleUpdate } = props;
  return (
    <>
      <Stack
        direction="column"
        marginTop="3vh"
        sx={{ width: '25%', height: '100%' }}
      >
        {/* strength */}
        <Box
          marginBottom="1vh"
          sx={{ height: '30%' }}
          display="flex"
          justifyContent="center"
        >
          <img src={stats_img[0]} style={stats_img_style} alt="strenght" />
          <p className="bonus">{character.stats().strength}</p>
          <TextField
            variant="standard"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              },
            }}
            sx={{
              position: 'absolute',
              width: '5%',
              alignSelf: 'center',
              transform: 'translate(0px,9.5vw)',
            }}
            name="strength"
            onChange={handleUpdate}
            value={character.stats().strength}
          />
        </Box>
        {/* dexterity */}
        <Box
          marginBottom="1vh"
          sx={{ height: '30%' }}
          display="flex"
          justifyContent="center"
        >
          <img src={stats_img[1]} style={stats_img_style} alt="dexterity" />
          <p className="bonus">{getBonusValue(character.stats().dexterity)}</p>
          <TextField
            variant="standard"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              },
            }}
            sx={{
              position: 'absolute',
              width: '5%',
              alignSelf: 'center',
              transform: 'translate(0px,9.5vw)',
            }}
            name="dexterity"
            onChange={handleUpdate}
            value={character.stats().dexterity}
          />
        </Box>
        {/* constitution */}
        <Box
          marginBottom="1vh"
          sx={{ height: '30%' }}
          display="flex"
          justifyContent="center"
        >
          <img src={stats_img[2]} style={stats_img_style} alt="constitution" />
          <p className="bonus">
            {getBonusValue(character.stats().constitution)}
          </p>
          <TextField
            variant="standard"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              },
            }}
            sx={{
              position: 'absolute',
              width: '5%',
              alignSelf: 'center',
              transform: 'translate(0px,9.5vw)',
            }}
            name="constitution"
            onChange={handleUpdate}
            value={character.stats().constitution}
          />
        </Box>
        {/* proficiency bonus */}
        <Box
          marginTop="3vw"
          marginBottom="1vw"
          sx={{ height: '10%' }}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <img
            src={ais_img[3]}
            style={{ height: '10%', width: '50%' }}
            alt="proficiency bonus"
          />
          <Box
            position="absolute"
            alignSelf="center"
            justifyContent="center"
            display="flex"
            width="60%"
          >
            <p style={{ alignSelf: 'center', fontSize: '4vw' }}>+</p>
            <TextField
              variant="standard"
              slotProps={{
                htmlInput: {
                  style: {
                    textAlign: 'center',
                    fontSize: '4vw',
                  },
                },
              }}
              sx={{ width: '10%', alignSelf: 'center' }}
              name="bonus"
              onChange={handleUpdate}
              value={character.otherStats().bonus}
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export function RightStats(props: {
  character: CharacterService;
  handleUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { character, handleUpdate } = props;

  return (
    <>
      <Stack
        right="0"
        direction="column"
        marginTop="3vh"
        sx={{ width: '25%', height: '100%' }}
      >
        {/* intelligence */}
        <Box
          marginBottom="1vh"
          sx={{ height: '30%' }}
          display="flex"
          justifyContent="center"
        >
          <img src={stats_img[3]} style={stats_img_style} alt="intelligence" />
          <p className="bonus">
            {getBonusValue(character.stats().intelligence)}
          </p>
          <TextField
            variant="standard"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              },
            }}
            sx={{
              position: 'absolute',
              width: '5%',
              alignSelf: 'center',
              transform: 'translate(0px,9.5vw)',
            }}
            name="intelligence"
            onChange={handleUpdate}
            value={character.stats().intelligence}
          />
        </Box>
        {/* wisdom */}
        <Box
          marginBottom="1vh"
          sx={{ height: '30%' }}
          display="flex"
          justifyContent="center"
        >
          <img src={stats_img[4]} style={stats_img_style} alt="wisdom" />
          <p className="bonus">{getBonusValue(character.stats().wisdom)}</p>
          <TextField
            variant="standard"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              },
            }}
            sx={{
              position: 'absolute',
              width: '5%',
              alignSelf: 'center',
              transform: 'translate(0px,9.5vw)',
            }}
            name="wisdom"
            onChange={handleUpdate}
            value={character.stats().wisdom}
          />
        </Box>
        {/* charisma */}
        <Box
          marginBottom="1vh"
          sx={{ height: '30%' }}
          display="flex"
          justifyContent="center"
        >
          <img src={stats_img[5]} style={stats_img_style} alt="charisma" />
          <p className="bonus">{getBonusValue(character.stats().charisma)}</p>
          <TextField
            variant="standard"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              },
            }}
            sx={{
              position: 'absolute',
              width: '5%',
              alignSelf: 'center',
              transform: 'translate(0px,9.5vw)',
            }}
            name="charisma"
            onChange={handleUpdate}
            value={character.stats().charisma}
          />
        </Box>
        {/* skills menu buton */}
        <Box
          marginTop="0vw"
          marginBottom="0vw"
          sx={{ height: '10%' }}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Button
            sx={{ height: '100%', width: '100%' }}
            /* onClick={handleShowSkillsChange} */
          >
            <img
              src={skills_img[0]}
              style={{ height: '20%', width: '70%' }}
              alt="skills_menu"
            />
          </Button>
          {/* skills menu */}
          <Box
            position="absolute"
            left="0"
            top="0"
            zIndex="3"
            width="80%"
            display="flex"
            justifyContent="center"
            justifyItems="center"
            justifySelf="center"
          >
            {/*  {checkIfShowSkills()} */}
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export function GeneralStats(props: {
  character: CharacterService;
  handleUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { character, handleUpdate } = props;

  const [life_img, setLifeImg] = useState(life_img_border[0]);
  const [life_temp_img, setLifeTempImg] = useState(life_img_border[2]);
  const [life_pool_img, setLifePoolImg] = useState(life_img_border[4]);

  return (
    <>
      <Stack
        display="flex"
        direction="column"
        marginTop="1vh"
        sx={{ width: '50%', height: '100%' }}
      >
        {/* character image and border */}
        <Box
          sx={{ height: '50%' }}
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <img
            src={player_img[0]}
            style={{ width: '90%', height: '90%', marginTop: '5%' }}
            alt="character"
          />
          <img
            src={player_img[1]}
            style={{ position: 'absolute', width: '100%', left: 0 }}
            alt="character"
          />
        </Box>
        {/* 3 other and hp stats */}
        <Stack direction="row" marginTop="-0vw" height="50%" display="flex">
          {/* left column initiative and minus operation */}
          <Stack
            display="flex"
            direction="column"
            marginTop="0vh"
            sx={{ width: '30%' }}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            {/* initiative */}
            <Box sx={{ width: '100%' }} display="flex" justifyContent="center">
              <img
                src={ais_img[1]}
                style={{ width: '100%', zIndex: 1 }}
                alt="initiative"
              />
              <Typography
                sx={{
                  width: '15%',
                  position: 'absolute',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: '6vw',
                  transform: 'translate(0px,2vw)',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                {/* {getBonusValue(character.skillsStats().ini.dex)} */}
              </Typography>
            </Box>
            {/* -5 */}
            <Button
              sx={{ marginBottom: '-1.5vh', height: '100%' }}
              /*  onClick={() => handleHpUpdate(-5)} */
            >
              <img
                src={life_mod_img_border[0]}
                style={{ width: '80%' }}
                alt="-5"
              />
              <p style={{ position: 'absolute', fontSize: '4vw' }}>-5</p>
            </Button>
            {/* -1 */}
            <Button
              sx={{ marginBottom: '-1.5vh', height: '100%' }}
              /*  onClick={() => handleHpUpdate(-1)} */
            >
              <img
                src={life_mod_img_border[0]}
                style={{ width: '100%' }}
                alt="-1"
              />
              <p style={{ position: 'absolute', fontSize: '5vw' }}>-1</p>
            </Button>
            {/* -10 */}
            <Button
              sx={{ marginBottom: '-1.5vh', height: '100%' }}
              /*  onClick={() => handleHpUpdate(-10)} */
            >
              <img
                src={life_mod_img_border[0]}
                style={{ width: '80%' }}
                alt="-10"
              />
              <p style={{ position: 'absolute', fontSize: '4vw' }}>-10</p>
            </Button>
          </Stack>
          {/* middle column AC and hp numbers */}
          <Stack
            display="flex"
            direction="column"
            marginTop="-1vh"
            width="40%"
            maxWidth="40%"
            alignSelf="center"
            height="100%"
            justifyContent="center"
          >
            {/* AC */}
            <Box
              sx={{ width: '100%' }}
              height="100%"
              display="flex"
              alignContent="center"
              justifyContent="center"
            >
              <img
                src={ais_img[0]}
                style={{ width: '70%', zIndex: 1 }}
                alt="AC"
              />
              <TextField
                variant="standard"
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 20,
                    style: {
                      textAlign: 'center',
                      color: 'black',
                      fontSize: '3.5vw',
                    },
                  },
                }}
                sx={{
                  position: 'absolute',
                  width: '10%',
                  alignSelf: 'center',
                  zIndex: 2,
                }}
                name="ac"
                onChange={handleUpdate}
                value={character.otherStats().ac}
              />
            </Box>
            {/* life score dials */}
            <Box width="100%" justifyContent="center" marginTop="0px">
              <Box display="flex" justifyContent="center">
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: '-7%',
                    height: '100%',
                  }}
                  /* onClick={() => handleHpSelect('normal')} */
                >
                  <img src={life_img} style={{ width: '100%' }} alt="life" />
                </Button>
                <TextField
                  variant="standard"
                  slotProps={{
                    htmlInput: {
                      style: { textAlign: 'center', fontSize: '7vw' },
                    },
                  }}
                  sx={{
                    position: 'absolute',
                    width: '10%',
                    alignSelf: 'center',
                    zIndex: 2,
                  }}
                  /* onChange={handleHpChange} */
                  value={character.hpStats().hp}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <Box display="flex" justifyContent="center" alignSelf="center">
                  <Button
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      height: '100%',
                    }}
                    /* onClick={() => handleHpSelect('temp')} */
                  >
                    <img
                      src={life_temp_img}
                      style={{ width: '12.5vw' }}
                      alt="life_temp"
                    />
                  </Button>
                  <TextField
                    variant="standard"
                    slotProps={{
                      htmlInput: {
                        style: { textAlign: 'center', fontSize: '5vw' },
                      },
                    }}
                    sx={{
                      position: 'absolute',
                      width: '7%',
                      alignSelf: 'center',
                      zIndex: 2,
                    }}
                    /*  onChange={handleHpTempChange} */
                    value={character.hpStats().hpTemp}
                  />
                </Box>
                <Box margin="-10px" />
                <Box display="flex" justifyContent="center" alignSelf="center">
                  <Button
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      height: '100%',
                    }}
                    /*  onClick={() => handleHpSelect('pool')} */
                  >
                    <img
                      src={life_pool_img}
                      style={{ width: '12.5vw' }}
                      alt="life_temp"
                    />
                  </Button>
                  <TextField
                    variant="standard"
                    slotProps={{
                      htmlInput: {
                        style: { textAlign: 'center', fontSize: '5vw' },
                      },
                    }}
                    sx={{
                      position: 'absolute',
                      width: '7%',
                      alignSelf: 'center',
                      zIndex: 2,
                    }}
                    /*  onChange={handleHpPoolChange} */
                    value={character.hpStats().hpPool}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
          {/* right column movement and plus operations */}
          <Stack
            display="flex"
            direction="column"
            marginTop="0vh"
            sx={{ width: '30%' }}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            {/* movement */}
            <Box
              sx={{ width: '100%' }}
              display="flex"
              justifyContent="center"
              marginBottom="1vw"
            >
              <img
                src={ais_img[2]}
                style={{ width: '100%', zIndex: 1 }}
                alt="speed"
              />
              <TextField
                variant="standard"
                slotProps={{
                  htmlInput: {
                    style: {
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '6vw',
                    },
                  },
                }}
                sx={{
                  position: 'absolute',
                  width: '10%',
                  alignSelf: 'center',
                  zIndex: 2,
                }}
                name="movement"
                onChange={handleUpdate}
                value={character.otherStats().movement}
              />
            </Box>
            {/* +5 */}
            <Button
              sx={{ marginBottom: '-1.5vh', height: '100%' }}
              /*  onClick={() => handleHpUpdate(+5)} */
            >
              <img
                src={life_mod_img_border[0]}
                style={{ width: '80%' }}
                alt="+5"
              />
              <p style={{ position: 'absolute', fontSize: '4vw' }}>+5</p>
            </Button>
            {/* +1 */}
            <Button
              sx={{ marginBottom: '-1.5vh', height: '100%' }}
              /*  onClick={() => handleHpUpdate(+1)} */
            >
              <img
                src={life_mod_img_border[0]}
                style={{ width: '100%' }}
                alt="+1"
              />
              <p style={{ position: 'absolute', fontSize: '5vw' }}>+1</p>
            </Button>
            {/* +10 */}
            <Button
              sx={{ marginBottom: '-1.5vh', height: '100%' }}
              /* onClick={() => handleHpUpdate(+10)} */
            >
              <img
                src={life_mod_img_border[0]}
                style={{ width: '80%' }}
                alt="+10"
              />
              <p style={{ position: 'absolute', fontSize: '4vw' }}>+10</p>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
