//react imports
import { ChangeEvent, useEffect, useRef, useState } from 'react';

//@mui imports
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
//@mui icons imports
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//components imports
import { useNavigate, useParams } from 'react-router-dom';
import { name_img } from '../../assets/Images.ts';
import { useCharacter } from '../../services/useCharacter.ts';
import { GeneralStats, LeftStats, RightStats } from './stats.tsx';

const wsUrl = 'ws://localhost:3002';

export default function Character() {
  const navigate = useNavigate();
  const { characterID } = useParams();
  const character = useCharacter(characterID ?? 'default');

  function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    if (Object.keys(character.stats()).includes(name)) {
      character.updateStats({
        [name]: value,
      });
    } else if (Object.keys(character.skillsStats()).includes(name)) {
      character.updateSkills({
        [name]: value,
      });
    } else if (Object.keys(character.otherStats()).includes(name)) {
      character.updateOther({
        [name]: value,
      });
    } else if (Object.keys(character.hpStats()).includes(name)) {
      character.updateHp({
        [name]: value,
      });
    }
  }

  const [hp, setHp] = useState({ hp: 10, hpTemp: 5, hpPool: 0 });
  const [idHp, setIdHp] = useState(0);

  const [otherCharacterStats, setOtherCharacterStats] = useState({
    ac: 10,
    mov: 30,
    bonus: 0,
  });

  // Switches
  const [characterStatsSwitch, setCharacterStatsSwitch] = useState(false);
  const [characterReStatsSwitch, setCharacterReStatsSwitch] = useState(false);
  const [otherCharacterStatsSwitch, setOtherCharacterStatsSwitch] =
    useState(false);
  const [otherCharacterReStatsSwitch, setOtherCharacterReStatsSwitch] =
    useState(false);
  const [hpStatsSwitch, setHpStatsSwitch] = useState(false);
  const [hpReStatsSwitch, setHpReStatsSwitch] = useState(false);
  const [showSkillsSwitch, setShowSkillsSwitch] = useState(false);

  // WebSockets
  const [ws, setWs] = useState(null);
  const message = useRef({});
  /* web socket connection management */
  useEffect(() => {
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log('WebSocket is connected');
    };

    websocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (
        message.backendPayload.character === localStorage.getItem('character')
      ) {
        switch (message.route) {
          case '/putCharacterStats':
            handleStatsChange(message.backendPayload);
            break;
          case '/putOtherCharacterStats':
            handleOtherStatsChange(message.backendPayload);
            break;
          case '/putHpStats':
            handleHpStatsChange(message.backendPayload);
            break;
        }
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  /* web socket send message */
  const sendMessage = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'message',
          payload: message,
        }),
      );
      message.current = {};
    }
  };

  /* web socket return stats updater */
  function handleStatsChange(data) {
    const auxStats = {};
    auxStats.str = data.strength;
    auxStats.dex = data.dexterity;
    auxStats.con = data.constitution;
    auxStats.int = data.intelligence;
    auxStats.wis = data.wisdom;
    auxStats.cha = data.charisma;
    //setCharacterStats({ ...auxStats });
    setCharacterReStatsSwitch(false);
  }

  /* web socket return other stats updater */
  function handleOtherStatsChange(data) {
    const auxStats = otherCharacterStats;
    auxStats.ac = data.ac;
    auxStats.mov = data.movement;
    auxStats.bonus = data.bonus;
    setOtherCharacterStats({ ...auxStats });
    setOtherCharacterReStatsSwitch(false);
  }

  /* web socket return hp updater */
  function handleHpStatsChange(data) {
    const auxStats = hp;
    auxStats.hp = data.hp;
    auxStats.hpTemp = data.hpTemp;
    auxStats.hpPool = data.hpPool;
    setHp({ ...auxStats });
    setHpReStatsSwitch(false);
  }

  /* first database info getter */
  /* useEffect(() => {
    const fetchCharacterStats = async () => {
      try {
        const userData = {
          character: localStorage.getItem('character'),
        };
        const response = await fetch(`${backendUrl}/getCharacterStats`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          if (response.status === 200) {
            const data = await response.json();
            const auxStats = characterStats;
            auxStats.str = data.strength;
            auxStats.dex = data.dexterity;
            auxStats.con = data.constitution;
            auxStats.int = data.intelligence;
            auxStats.wis = data.wisdom;
            auxStats.cha = data.charisma;
            setCharacterStats(auxStats);
            setCharacterStatsSwitch(true);
          } else {
            const updateCharacterStats = async () => {
              try {
                const userData = {
                  character: localStorage.getItem('character'),
                  strength: 10,
                  dexterity: 10,
                  constitution: 10,
                  intelligence: 10,
                  wisdom: 10,
                  charisma: 10,
                };
                const response = await fetch(
                  `${backendUrl}/putCharacterStats`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                  },
                );
                if (!response.ok) {
                  console.error(
                    'An unexpected error ocurred while trying to update your stats',
                  );
                }
              } catch (error) {
                console.error('Error at character stats.' + error);
                alert(
                  'An unexpected error ocurred while trying to update your stats',
                );
              }
            };
            updateCharacterStats();
          }
        } else {
          console.error('Error at character stats.');
        }
      } catch (error) {
        console.error('Error at character stats.' + error);
        alert('An unexpected error ocurred while trying to load your stats');
      }
    };
    fetchCharacterStats();
    const fetchOtherCharacterStats = async () => {
      try {
        const userData = {
          character: localStorage.getItem('character'),
        };
        const response = await fetch(`${backendUrl}/getOtherCharacterStats`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          if (response.status === 200) {
            const data = await response.json();
            const auxStats = otherCharacterStats;
            auxStats.ac = data.ac;
            auxStats.mov = data.movement;
            auxStats.bonus = data.bonus;
            setOtherCharacterStats(auxStats);
            setOtherCharacterStatsSwitch(true);
          } else {
            const updateOtherCharacterStats = async () => {
              try {
                const userData = {
                  character: localStorage.getItem('character'),
                  ac: 10,
                  movement: 30,
                  bonus: 0,
                };
                const response = await fetch(
                  `${backendUrl}/putOtherCharacterStats`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                  },
                );
                if (!response.ok) {
                  console.error(
                    'An unexpected error ocurred while trying to update your stats',
                  );
                }
              } catch (error) {
                console.error('Error at character stats.' + error);
                alert(
                  'An unexpected error ocurred while trying to update your stats',
                );
              }
            };
            updateOtherCharacterStats();
          }
        } else {
          console.error('Error at character stats.');
        }
      } catch (error) {
        console.error('Error at character stats.' + error);
        alert('An unexpected error ocurred while trying to load your stats');
      }
    };
    fetchOtherCharacterStats();
    const fetchHpStats = async () => {
      try {
        const userData = {
          character: localStorage.getItem('character'),
        };
        const response = await fetch(`${backendUrl}/getHpStats`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          if (response.status === 200) {
            const data = await response.json();
            const auxStats = hp;
            auxStats.hp = data.hp;
            auxStats.hpTemp = data.hpTemp;
            auxStats.hpPool = data.hpPool;
            setHp(auxStats);
            setHpStatsSwitch(true);
          } else {
            const updateHpStats = async () => {
              try {
                const userData = {
                  character: localStorage.getItem('character'),
                  hp: 10,
                  hpTemp: 5,
                  hpPool: 0,
                };
                const response = await fetch(`${backendUrl}/putHpStats`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
                });
                if (!response.ok) {
                  console.error(
                    'An unexpected error ocurred while trying to update your hp',
                  );
                }
              } catch (error) {
                console.error('Error at character hp.' + error);
                alert(
                  'An unexpected error ocurred while trying to update your hp',
                );
              }
            };
            updateHpStats();
          }
        } else {
          console.error('Error at character hp.');
        }
      } catch (error) {
        console.error('Error at character hp.' + error);
        alert('An unexpected error ocurred while trying to load your hp');
      }
    };
    fetchHpStats();
  }, []); */

  /* character stats updater { str | dex | con | int | wis | cha } */
  /* useEffect(() => {
    if (characterStatsSwitch && characterReStatsSwitch) {
      message.current = {
        route: '/putCharacterStats',
        backendPayload: {
          character: localStorage.getItem('character'),
          strength: characterStats.str,
          dexterity: characterStats.dex,
          constitution: characterStats.con,
          intelligence: characterStats.int,
          wisdom: characterStats.wis,
          charisma: characterStats.cha,
        },
      };
      sendMessage();
    }
  }, [characterStats, characterStatsSwitch, characterReStatsSwitch]);
 */
  /* character other stats updater { ac | movement-speed} */
  /* useEffect(() => {
    if (otherCharacterStatsSwitch && otherCharacterReStatsSwitch) {
      message.current = {
        route: '/putOtherCharacterStats',
        backendPayload: {
          character: localStorage.getItem('character'),
          ac: otherCharacterStats.ac,
          movement: otherCharacterStats.mov,
          bonus: otherCharacterStats.bonus,
        },
      };
      sendMessage();
    }
  }, [
    otherCharacterStats,
    otherCharacterStatsSwitch,
    otherCharacterReStatsSwitch,
  ]); */
  /* character hp */
  /*  useEffect(() => {
    if (hpStatsSwitch && hpReStatsSwitch) {
      message.current = {
        route: '/putHpStats',
        backendPayload: {
          character: localStorage.getItem('character'),
          hp: hp.hp,
          hpTemp: hp.hpTemp,
          hpPool: hp.hpPool,
        },
      };
      sendMessage();
    }
  }, [hp, hpStatsSwitch, hpReStatsSwitch]);
 */
  /*
  function handleHpUpdate(mod: number) {
    const auxStats = hp;
    switch (idHp) {
      case 0:
        auxStats.hp += mod;
        break;
      case 1:
        auxStats.hpTemp += mod;
        break;
      case 2:
        auxStats.hpPool += mod;
        break;
    }
    setHp({ ...auxStats });
    setHpStatsSwitch(true);
    setHpReStatsSwitch(true);
  }

  function handleHpSelect(type: string) {
    switch (type) {
      case 'normal':
        setIdHp(0);
        setLifeImg(life_img_border[1]);
        setLifeTempImg(life_img_border[2]);
        setLifePoolImg(life_img_border[4]);
        break;
      case 'temp':
        setIdHp(1);
        setLifeImg(life_img_border[0]);
        setLifeTempImg(life_img_border[3]);
        setLifePoolImg(life_img_border[4]);
        break;
      case 'pool':
        setIdHp(2);
        setLifeImg(life_img_border[0]);
        setLifeTempImg(life_img_border[2]);
        setLifePoolImg(life_img_border[5]);
        break;
    }
  }

  function handleStrChange(e) {
    setCharacterReStatsSwitch(true);
    const auxStats = characterStats;
    if (e.target.value === '0-') auxStats.str = 0;
    else auxStats.str = Number(e.target.value);
    setCharacterStats({ ...auxStats });
  }

  function handleDexChange(e) {
    setCharacterReStatsSwitch(true);
    const auxStats = characterStats;
    if (e.target.value === '0-') auxStats.dex = 0;
    else auxStats.dex = Number(e.target.value);
    setCharacterStats({ ...auxStats });
  }
  function handleConChange(e) {
    setCharacterReStatsSwitch(true);
    const auxStats = characterStats;
    if (e.target.value === '0-') auxStats.con = 0;
    else auxStats.con = Number(e.target.value);
    setCharacterStats({ ...auxStats });
  }
  function handleIntChange(e) {
    setCharacterReStatsSwitch(true);
    const auxStats = characterStats;
    if (e.target.value === '0-') auxStats.int = 0;
    else auxStats.int = Number(e.target.value);
    setCharacterStats({ ...auxStats });
  }
  function handleWisChange(e) {
    setCharacterReStatsSwitch(true);
    const auxStats = characterStats;
    if (e.target.value === '0-') auxStats.wis = 0;
    else auxStats.wis = Number(e.target.value);
    setCharacterStats({ ...auxStats });
  }
  function handleChaChange(e) {
    setCharacterReStatsSwitch(true);
    const auxStats = characterStats;
    if (e.target.value === '0-') auxStats.cha = 0;
    else auxStats.cha = Number(e.target.value);
    setCharacterStats({ ...auxStats });
  }

  function handleACChange(e) {
    setOtherCharacterReStatsSwitch(true);
    const auxStats = otherCharacterStats;
    if (e.target.value === '0-') auxStats.ac = 0;
    else auxStats.ac = Number(e.target.value);
    setOtherCharacterStats(auxStats);
  }
  function handleMovChange(e) {
    setOtherCharacterReStatsSwitch(true);
    const auxStats = otherCharacterStats;
    if (e.target.value === '0-') auxStats.mov = 0;
    else auxStats.mov = Number(e.target.value);
    setOtherCharacterStats(auxStats);
  }
  function handleBonusChange(e) {
    setOtherCharacterReStatsSwitch(true);
    const auxStats = otherCharacterStats;
    if (e.target.value === '0-') auxStats.bonus = 0;
    else auxStats.bonus = Number(e.target.value);
    setOtherCharacterStats(auxStats);
  }

  function handleHpChange(e) {
    setHpReStatsSwitch(true);
    const auxStats = hp;
    if (e.target.value === '0-') auxStats.hp = 0;
    else auxStats.hp = Number(e.target.value);
    setHp(auxStats);
  }
  function handleHpTempChange(e) {
    setHpReStatsSwitch(true);
    const auxStats = hp;
    if (e.target.value === '0-') auxStats.hpTemp = 0;
    else auxStats.hpTemp = Number(e.target.value);
    setHp(auxStats);
  }
  function handleHpPoolChange(e) {
    setHpReStatsSwitch(true);
    const auxStats = hp;
    if (e.target.value === '0-') auxStats.hpPool = 0;
    else auxStats.hpPool = Number(e.target.value);
    setHp(auxStats);
  }

  function handleShowSkillsChange() {
    setShowSkillsSwitch(!showSkillsSwitch);
  }*/

  /* extra life counter */
  /*  function checkIfLifePoolNeeded() {
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
              <img
                src={life_temp_img}
                style={{ width: '80%' }}
                alt="life_temp"
              />
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

  /* show skills menu */
  /* function checkIfShowSkills() {
    if (showSkillsSwitch) {
      return (
        <SkillsMenu
          bonus={otherCharacterStats.bonus}
          characterStats={characterStats}
          handleShowSkillsChange={handleShowSkillsChange}
        />
      );
    } else return <></>;
  } */

  return (
    <>
      {/*   <CharacterCard name={character.name} /> */}
      {/* go back button */}
      <div style={{ position: 'absolute', left: '0', width: '5px' }}>
        <Button
          size="small"
          sx={{ minWidth: '32px', height: '32px', p: '4px' }}
          onClick={() => navigate('/')}
        >
          <ArrowBackIcon />
        </Button>
      </div>
      {/* general row */}
      <Stack
        display="flex"
        direction="row"
        sx={{ width: '100%', height: '50%' }}
        marginBottom="-0px"
      >
        {/* left stats column */}
        <LeftStats character={character} handleUpdate={handleUpdate} />
        {/* center column */}
        <GeneralStats character={character} handleUpdate={handleUpdate} />
        {/* right stats column */}
        <RightStats character={character} />
      </Stack>

      {/* character name and border */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <p
          style={{ position: 'absolute', textAlign: 'center', fontSize: '5vw' }}
        >
          {character.name}
        </p>
        <img src={name_img[0]} style={{ width: '100%' }} alt="name" />
      </Box>
    </>
  );
}
