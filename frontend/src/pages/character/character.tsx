//react imports
import { ChangeEvent, useState } from 'react';

//@mui imports
import Stack from '@mui/material/Stack';
//@mui icons imports

//components imports
import { Button, ConfigProvider, Drawer, Flex, InputNumber, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ais_img, NameBorder, skills_img } from '../../assets/Images.ts';
import { useCharacter } from '../../services/useCharacter.ts';
import { useTheme } from '../../utils/theme.ts';
import SkillsMenu from './skillsMenu.tsx';
import { GeneralStats, LeftStats, RightStats } from './stats.tsx';

export default function Character() {
  const navigate = useNavigate();
  const { characterID } = useParams();
  const character = useCharacter(characterID ?? 'default');
  const [showSkills, setShowSkills] = useState(false);
  const { currentTheme, updateTheme } = useTheme();

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

  return (
    <>
      {/* general row */}
      <Stack
        display="flex"
        direction="row"
        sx={{ width: '100%', height: '50%' }}
      >
        {/* left stats column */}
        <LeftStats character={character} handleUpdate={handleUpdate} />
        {/* center column */}
        <GeneralStats character={character} handleUpdate={handleUpdate} />
        {/* right stats column */}
        <RightStats character={character} />
      </Stack>

      <Row justify="space-between" align="middle">
        {/* proficiency bonus */}
        <Flex
          justify="center"
          align="center"
          style={{
            width: '25%',
          }}
        >
          <img src={ais_img[3]} width="50%" alt="proficiency bonus" />
          <InputNumber
            style={{
              position: 'absolute',
              alignSelf: 'center',
              width: 60,
              fontSize: '3.5vw',
            }}
            formatter={(value) => `+${value}`}
            variant="borderless"
            name="bonus"
            onChange={() => handleUpdate}
            value={character.otherStats().bonus}
          />
        </Flex>
        {/* skills menu button */}
        <Flex
          justify="center"
          align="center"
          style={{
            width: '25%',
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  controlHeightLG: '100%',
                },
              },
            }}
          >
            <Button
              icon={<img src={skills_img[0]} height="100%" alt="skills_menu" />}
              size="large"
              type="text"
              onClick={() => setShowSkills(true)}
            />
          </ConfigProvider>
        </Flex>
      </Row>

      {/* character name and border */}
      <Flex justify="center" align="center">
        <h1 style={{ position: 'absolute' }}>{character.name}</h1>
        <img
          src={NameBorder.light}
          style={{ width: '100%', paddingTop: 12 }}
          alt="name"
        />
      </Flex>
      <Drawer
        placement="bottom"
        size="large"
        open={showSkills}
        onClose={() => setShowSkills(false)}
      >
        <SkillsMenu character={character} />
      </Drawer>
    </>
  );
}
