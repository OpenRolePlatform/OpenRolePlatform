//react imports
import { useEffect, useRef, useState } from 'react';
//@mui imports
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
//@mui icons imports
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//components imports
import SkillsMenu from '../components/skillsMenu.tsx';

const backendUrl = 'http://localhost:3001';
const wsUrl = 'ws://localhost:3002';

const stats_img = [
  'img/stats_str2.png',
  'img/stats_dex2.png',
  'img/stats_con2.png',
  'img/stats_int2.png',
  'img/stats_wis2.png',
  'img/stats_cha2.png',
];

const stats_img_style = {
  height: '100%',
  width: '100%',
};

const player_img = [
  'img/raven.jpeg',
  'img/border2.png',
  'img/border2_dark.png',
];

const name_img = [
  //'img/name_dark.png',
  'img/name2.png',
];

const life_mod_img_border = ['img/life_mod_border2.png'];

const life_img_border = [
  'img/life_border2.png',
  'img/life_border2_selected.png',
  'img/life_temp_border2.png',
  'img/life_temp_border2_selected.png',
  'img/life_pool_border2.png',
  'img/life_pool_border2_selected.png',
];

const ais_img = [
  'img/armor_class.png',
  'img/initiative.png',
  'img/speed.png',
  'img/bonus_border.png',
];

const skills_img = ['img/skills.png'];

export default function Character() {
  let character_name = '';

  const [hp, setHp] = useState({ hp: 10, hpTemp: 5, hpPool: 0 });
  const [idHp, setIdHp] = useState(0);
  const [life_img, setLifeImg] = useState(life_img_border[0]);
  const [life_temp_img, setLifeTempImg] = useState(life_img_border[2]);
  const [life_pool_img, setLifePoolImg] = useState(life_img_border[4]);

  const [characterStats, setCharacterStats] = useState({
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  });
  const [otherCharacterStats, setOtherCharacterStats] = useState({
    ac: 10,
    mov: 30,
    bonus: 0,
  });
  const [characterStatsSwitch, setCharacterStatsSwitch] = useState(false);
  const [characterReStatsSwitch, setCharacterReStatsSwitch] = useState(false);
  const [otherCharacterStatsSwitch, setOtherCharacterStatsSwitch] =
    useState(false);
  const [otherCharacterReStatsSwitch, setOtherCharacterReStatsSwitch] =
    useState(false);
  const [hpStatsSwitch, setHpStatsSwitch] = useState(false);
  const [hpReStatsSwitch, setHpReStatsSwitch] = useState(false);

  const [showSkillsSwitch, setShowSkillsSwitch] = useState(false);

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

    //@ts-ignore
    setWs(websocket);

    return () => {
      websocket.close();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  /* web socket send message */
  const sendMessage = () => {
    if (ws) {
      //@ts-ignore
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
    const auxStats = characterStats;
    auxStats.str = data.strength;
    auxStats.dex = data.dexterity;
    auxStats.con = data.constitution;
    auxStats.int = data.intelligence;
    auxStats.wis = data.wisdom;
    auxStats.cha = data.charisma;
    setCharacterStats({ ...auxStats });
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

  /* initializer function */
  function init_values() {
    switch (localStorage.getItem('character')) {
      case 'raven':
        character_name = 'Ravenhall Storm';
        player_img[0] = 'img/raven.jpeg';
        break;
      case 'amadeus':
        character_name = 'Amadeus Guideon More';
        player_img[0] = 'img/amadeus.jpeg';
        break;
      case 'aalis':
        character_name = 'Aalis';
        player_img[0] = 'img/aalis.jpeg';
        break;
      case 'ozymandias':
        character_name = 'Ozymandias';
        player_img[0] = 'img/ozymandias.png';
        break;
      default:
        //@ts-ignore
        window.location = '/';
        break;
    }
  }
  init_values();

  /* first database info getter */
  useEffect(() => {
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
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  /* character stats updater { str | dex | con | int | wis | cha } */
  useEffect(() => {
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
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [characterStats, characterStatsSwitch, characterReStatsSwitch]);
  /* character other stats updater { ac | movement-speed} */
  useEffect(() => {
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
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    otherCharacterStats,
    otherCharacterStatsSwitch,
    otherCharacterReStatsSwitch,
  ]);
  /* character hp */
  useEffect(() => {
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
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [hp, hpStatsSwitch, hpReStatsSwitch]);

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

  function getBonusValue(value: number) {
    switch (value) {
      case 0:
        return '-5';
      case 1:
        return '-5';
      case 2:
        return '-4';
      case 3:
        return '-4';
      case 4:
        return '-3';
      case 5:
        return '-3';
      case 6:
        return '-2';
      case 7:
        return '-2';
      case 8:
        return '-1';
      case 9:
        return '-1';
      case 10:
        return '+0';
      case 11:
        return '+0';
      case 12:
        return '+1';
      case 13:
        return '+1';
      case 14:
        return '+2';
      case 15:
        return '+2';
      case 16:
        return '+3';
      case 17:
        return '+3';
      case 18:
        return '+4';
      case 19:
        return '+4';
      case 20:
        return '+5';
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
  }

  /* extra life counter */
  function checkIfLifePoolNeeded() {
    if (localStorage.getItem('character') === 'amadeus') {
      return (
        <Box width="100%" justifyContent="center" marginTop="0px">
          {/* hp */}
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
          {/* HpTemp & HpPool */}
          <Box display="flex" justifyContent="center">
            {/* hp temp */}
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
            {/* helper separation box */}
            <Box margin="-10px" />
            {/* HpPool */}
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
          {/* hp */}
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
          {/* hp temp */}
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
  }

  /* show skills menu */
  function checkIfShowSkills() {
    if (showSkillsSwitch) {
      return (
        <SkillsMenu
          bonus={otherCharacterStats.bonus}
          characterStats={characterStats}
          handleShowSkillsChange={handleShowSkillsChange}
        />
      );
    } else return <></>;
  }

  return (
    <>
      {/* go back button */}
      <div style={{ position: 'absolute', left: '0', width: '5px' }}>
        <Button
          size="small"
          sx={{ minWidth: '32px', height: '32px', p: '4px' }}
          //@ts-ignore
          onClick={() => (window.location = '/')}
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
            <p
              style={{
                position: 'absolute',
                color: 'black',
                alignSelf: 'center',
                transform: 'translate(0px,1vh)',
                fontSize: '7vw',
              }}
            >
              {getBonusValue(characterStats['str'])}
            </p>
            <TextField
              variant="standard"
              inputProps={{
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              }}
              sx={{
                position: 'absolute',
                width: '5%',
                alignSelf: 'center',
                transform: 'translate(0px,8vw)',
              }}
              onChange={handleStrChange}
              value={characterStats.str}
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
            <p
              style={{
                position: 'absolute',
                color: 'black',
                alignSelf: 'center',
                transform: 'translate(0px,0vh)',
                fontSize: '7vw',
              }}
            >
              {getBonusValue(characterStats['dex'])}
            </p>
            <TextField
              variant="standard"
              inputProps={{
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              }}
              sx={{
                position: 'absolute',
                width: '5%',
                alignSelf: 'center',
                transform: 'translate(0px,5.5vw)',
              }}
              onChange={handleDexChange}
              value={characterStats.dex}
            />
          </Box>
          {/* constitution */}
          <Box
            marginBottom="1vh"
            sx={{ height: '30%' }}
            display="flex"
            justifyContent="center"
          >
            <img
              src={stats_img[2]}
              style={stats_img_style}
              alt="constitution"
            />
            <p
              style={{
                position: 'absolute',
                color: 'black',
                alignSelf: 'center',
                transform: 'translate(0px,0px)',
                fontSize: '7vw',
              }}
            >
              {getBonusValue(characterStats['con'])}
            </p>
            <TextField
              variant="standard"
              inputProps={{
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              }}
              sx={{
                position: 'absolute',
                width: '5%',
                alignSelf: 'center',
                transform: 'translate(0px,6vw)',
              }}
              onChange={handleConChange}
              value={characterStats.con}
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
                inputProps={{ style: { textAlign: 'center', fontSize: '4vw' } }}
                sx={{ width: '10%', alignSelf: 'center' }}
                onChange={handleBonusChange}
                value={otherCharacterStats.bonus}
              />
            </Box>
          </Box>
        </Stack>
        {/* center column */}
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
              <Box
                sx={{ width: '100%' }}
                display="flex"
                justifyContent="center"
              >
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
                  {getBonusValue(characterStats.dex)}
                </Typography>
              </Box>
              {/* -5 */}
              <Button
                sx={{ marginBottom: '-1.5vh', height: '100%' }}
                onClick={() => handleHpUpdate(-5)}
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
                onClick={() => handleHpUpdate(-1)}
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
                onClick={() => handleHpUpdate(-10)}
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
                  inputProps={{
                    min: 0,
                    max: 20,
                    style: {
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '6.5vw',
                    },
                  }}
                  sx={{
                    position: 'absolute',
                    width: '10%',
                    alignSelf: 'center',
                    zIndex: 2,
                  }}
                  onChange={handleACChange}
                  value={otherCharacterStats.ac}
                />
              </Box>
              {/* life score dials */}
              {checkIfLifePoolNeeded()}
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
                  inputProps={{
                    style: {
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '6vw',
                    },
                  }}
                  sx={{
                    position: 'absolute',
                    width: '10%',
                    alignSelf: 'center',
                    zIndex: 2,
                  }}
                  onChange={handleMovChange}
                  value={otherCharacterStats.mov}
                />
              </Box>
              {/* +5 */}
              <Button
                sx={{ marginBottom: '-1.5vh', height: '100%' }}
                onClick={() => handleHpUpdate(+5)}
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
                onClick={() => handleHpUpdate(+1)}
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
                onClick={() => handleHpUpdate(+10)}
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
        {/* right stats column */}
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
            <img
              src={stats_img[3]}
              style={stats_img_style}
              alt="intelligence"
            />
            <p
              style={{
                position: 'absolute',
                color: 'black',
                alignSelf: 'center',
                transform: 'translate(0px,0px)',
                fontSize: '7vw',
              }}
            >
              {getBonusValue(characterStats['int'])}
            </p>
            <TextField
              variant="standard"
              inputProps={{
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              }}
              sx={{
                position: 'absolute',
                width: '5%',
                alignSelf: 'center',
                transform: 'translate(0px,6vw)',
              }}
              onChange={handleIntChange}
              value={characterStats.int}
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
            <p
              style={{
                position: 'absolute',
                color: 'black',
                alignSelf: 'center',
                transform: 'translate(0px,0.5vh)',
                fontSize: '7vw',
              }}
            >
              {getBonusValue(characterStats['wis'])}
            </p>
            <TextField
              variant="standard"
              inputProps={{
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              }}
              sx={{
                position: 'absolute',
                width: '5%',
                alignSelf: 'center',
                transform: 'translate(0px,7.5vw)',
              }}
              onChange={handleWisChange}
              value={characterStats.wis}
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
            <p
              style={{
                position: 'absolute',
                color: 'black',
                alignSelf: 'center',
                transform: 'translate(0px,1vh)',
                fontSize: '7vw',
              }}
            >
              {getBonusValue(characterStats['cha'])}
            </p>
            <TextField
              variant="standard"
              inputProps={{
                min: 0,
                max: 20,
                style: {
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '3.5vw',
                },
              }}
              sx={{
                position: 'absolute',
                width: '5%',
                alignSelf: 'center',
                transform: 'translate(0px,8.5vw)',
              }}
              onChange={handleChaChange}
              value={characterStats.cha}
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
              onClick={handleShowSkillsChange}
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
              {checkIfShowSkills()}
            </Box>
          </Box>
        </Stack>
      </Stack>
      {/* character name and border */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <p
          style={{ position: 'absolute', textAlign: 'center', fontSize: '5vw' }}
        >
          {character_name}
        </p>
        <img src={name_img[0]} style={{ width: '100%' }} alt="name" />
      </Box>
    </>
  );
}
