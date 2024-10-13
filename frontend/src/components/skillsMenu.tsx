//react imports
import { useEffect, useRef, useState } from 'react';
//@mui imports
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
//@mui icons imports
import CloseIcon from '@mui/icons-material/Close';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const backendUrl = 'http://localhost:3001';
const wsUrl = 'ws://localhost:3002';

const skills_img = ['img/skills_border.png'];

const basicSkillsFontSize = '3vw';

interface SkillsMenuProps {
  bonus: number;
  characterStats: {};
  handleShowSkillsChange: () => void;
}

export default function SkillsMenu({
  bonus,
  characterStats,
  handleShowSkillsChange,
}: SkillsMenuProps) {
  const [skillsBonus, setSkillsBonus] = useState({
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
    acrobatics: false,
    animal: false,
    arcana: false,
    athletics: false,
    deception: false,
    history: false,
    insight: false,
    intimidation: false,
    investigation: false,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    hand: false,
    stealth: false,
    survival: false,
  });
  const [skillsValue, setSkillsValue] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    acrobatics: 0,
    animal: 0,
    arcana: 0,
    athletics: 0,
    deception: 0,
    history: 0,
    insight: 0,
    intimidation: 0,
    investigation: 0,
    medicine: 0,
    nature: 0,
    perception: 0,
    performance: 0,
    persuasion: 0,
    religion: 0,
    hand: 0,
    stealth: 0,
    survival: 0,
  });
  const [skillsSwitch, setSkillsSwitch] = useState(false);
  const [skillsReSwitch, setSkillsReSwitch] = useState(false);

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
          case '/putSkillsStats':
            handleSkillsChange(message.backendPayload);
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
  function handleSkillsChange(data) {
    setSkillsBonus({ ...data });
    setSkillsReSwitch(false);
  }

  function getBonusValue(value: number) {
    switch (value) {
      case 0:
        return -5;
      case 1:
        return -5;
      case 2:
        return -4;
      case 3:
        return -4;
      case 4:
        return -3;
      case 5:
        return -3;
      case 6:
        return -2;
      case 7:
        return -2;
      case 8:
        return -1;
      case 9:
        return -1;
      case 10:
        return 0;
      case 11:
        return 0;
      case 12:
        return 1;
      case 13:
        return 1;
      case 14:
        return 2;
      case 15:
        return 2;
      case 16:
        return 3;
      case 17:
        return 3;
      case 18:
        return 4;
      case 19:
        return 4;
      case 20:
        return 5;
      default:
        return 0;
    }
  }

  /* first database info getter */
  useEffect(() => {
    const fetchSkillsStats = async () => {
      try {
        const userData = {
          character: localStorage.getItem('character'),
        };
        const response = await fetch(`${backendUrl}/getSkillsStats`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          if (response.status === 200) {
            const data = await response.json();
            setSkillsBonus({ ...data });
            setSkillsSwitch(true);
          } else {
            const updateSkillsStats = async () => {
              try {
                const userData = {
                  character: localStorage.getItem('character'),
                  strength: false,
                  dexterity: false,
                  constitution: false,
                  intelligence: false,
                  wisdom: false,
                  charisma: false,
                  acrobatics: false,
                  animal: false,
                  arcana: false,
                  athletics: false,
                  deception: false,
                  history: false,
                  insight: false,
                  intimidation: false,
                  investigation: false,
                  medicine: false,
                  nature: false,
                  perception: false,
                  performance: false,
                  persuasion: false,
                  religion: false,
                  hand: false,
                  stealth: false,
                  survival: false,
                };
                const response = await fetch(`${backendUrl}/putSkillsStats`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
                });
                if (!response.ok) {
                  console.error(
                    'An unexpected error ocurred while trying to update your skills',
                  );
                }
              } catch (error) {
                console.error('Error at character skills.' + error);
                alert(
                  'An unexpected error ocurred while trying to update your skills',
                );
              }
            };
            updateSkillsStats();
          }
        } else {
          console.error('Error at character skills.');
        }
      } catch (error) {
        console.error('Error at character skills.' + error);
        alert('An unexpected error ocurred while trying to load your skills');
      }
    };
    fetchSkillsStats();
  }, []);

  /* skills */
  useEffect(() => {
    if (skillsSwitch && skillsReSwitch) {
      message.current = {
        route: '/putSkillsStats',
        backendPayload: {
          character: localStorage.getItem('character'),
          strength: skillsBonus.strength,
          dexterity: skillsBonus.dexterity,
          constitution: skillsBonus.constitution,
          intelligence: skillsBonus.intelligence,
          wisdom: skillsBonus.wisdom,
          charisma: skillsBonus.charisma,
          acrobatics: skillsBonus.acrobatics,
          animal: skillsBonus.animal,
          arcana: skillsBonus.arcana,
          athletics: skillsBonus.athletics,
          deception: skillsBonus.deception,
          history: skillsBonus.history,
          insight: skillsBonus.insight,
          intimidation: skillsBonus.intimidation,
          investigation: skillsBonus.investigation,
          medicine: skillsBonus.medicine,
          nature: skillsBonus.nature,
          perception: skillsBonus.perception,
          performance: skillsBonus.performance,
          persuasion: skillsBonus.persuasion,
          religion: skillsBonus.religion,
          hand: skillsBonus.hand,
          stealth: skillsBonus.stealth,
          survival: skillsBonus.survival,
        },
      };
      sendMessage();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [skillsBonus, skillsSwitch, skillsReSwitch]);

  /* skill bonus calculation */
  useEffect(() => {
    const resultStr = getBonusValue(characterStats['str']);
    const resultDex = getBonusValue(characterStats['dex']);
    const resultCon = getBonusValue(characterStats['con']);
    const resultInt = getBonusValue(characterStats['int']);
    const resultWis = getBonusValue(characterStats['wis']);
    const resultCha = getBonusValue(characterStats['cha']);

    const auxSkills = skillsValue;
    auxSkills['strength'] =
      resultStr + (skillsBonus['strength'] ? Number(bonus) : Number(0));
    auxSkills['dexterity'] =
      resultDex + (skillsBonus['dexterity'] ? Number(bonus) : Number(0));
    auxSkills['constitution'] =
      resultCon + (skillsBonus['constitution'] ? Number(bonus) : Number(0));
    auxSkills['intelligence'] =
      resultInt + (skillsBonus['intelligence'] ? Number(bonus) : Number(0));
    auxSkills['wisdom'] =
      resultWis + (skillsBonus['wisdom'] ? Number(bonus) : Number(0));
    auxSkills['charisma'] =
      resultCha + (skillsBonus['charisma'] ? Number(bonus) : Number(0));
    auxSkills['acrobatics'] =
      resultDex + (skillsBonus['acrobatics'] ? Number(bonus) : Number(0));
    auxSkills['animal'] =
      resultWis + (skillsBonus['animal'] ? Number(bonus) : Number(0));
    auxSkills['arcana'] =
      resultInt + (skillsBonus['arcana'] ? Number(bonus) : Number(0));
    auxSkills['athletics'] =
      resultStr + (skillsBonus['athletics'] ? Number(bonus) : Number(0));
    auxSkills['deception'] =
      resultCha + (skillsBonus['deception'] ? Number(bonus) : Number(0));
    auxSkills['history'] =
      resultInt + (skillsBonus['history'] ? Number(bonus) : Number(0));
    auxSkills['insight'] =
      resultWis + (skillsBonus['insight'] ? Number(bonus) : Number(0));
    auxSkills['intimidation'] =
      resultCha + (skillsBonus['intimidation'] ? Number(bonus) : Number(0));
    auxSkills['investigation'] =
      resultInt + (skillsBonus['investigation'] ? Number(bonus) : Number(0));
    auxSkills['medicine'] =
      resultWis + (skillsBonus['medicine'] ? Number(bonus) : Number(0));
    auxSkills['nature'] =
      resultInt + (skillsBonus['nature'] ? Number(bonus) : Number(0));
    auxSkills['perception'] =
      resultWis + (skillsBonus['perception'] ? Number(bonus) : Number(0));
    auxSkills['performance'] =
      resultCha + (skillsBonus['performance'] ? Number(bonus) : Number(0));
    auxSkills['persuasion'] =
      resultCha + (skillsBonus['persuasion'] ? Number(bonus) : Number(0));
    auxSkills['religion'] =
      resultInt + (skillsBonus['religion'] ? Number(bonus) : Number(0));
    auxSkills['hand'] =
      resultDex + (skillsBonus['hand'] ? Number(bonus) : Number(0));
    auxSkills['stealth'] =
      resultDex + (skillsBonus['stealth'] ? Number(bonus) : Number(0));
    auxSkills['survival'] =
      resultWis + (skillsBonus['survival'] ? Number(bonus) : Number(0));
    setSkillsValue({ ...auxSkills });

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [skillsBonus]);

  function handleBonusChange(target: string) {
    const auxSkills = skillsBonus;
    auxSkills[target] = !auxSkills[target];
    setSkillsBonus({ ...auxSkills });
    setSkillsReSwitch(true);
  }

  return (
    // general container box
    <Box
      position="absolute"
      left="10vw"
      display="flex"
      width="100%"
      justifyContent="center"
    >
      {/* text box */}
      <Box>
        {/* basic stats row */}
        <Stack direction="row" justifyContent="center" marginTop="15vw">
          {/* basic stats left column */}
          <Stack
            direction="column"
            width="50%"
            maxWidth="50%"
            marginRight="-3vw"
          >
            {/* strength */}
            <Box display="flex" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['strength']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('strength')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['strength'] < 0 ? '' : '+'}
                  {skillsValue['strength']}
                </b>
                &nbsp;Fuerza
              </p>
            </Box>
            {/* dexterity */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['dexterity']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('dexterity')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['dexterity'] < 0 ? '' : '+'}
                  {skillsValue['dexterity']}
                </b>
                &nbsp;Destreza
              </p>
            </Box>
            {/* constitution */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['constitution']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('constitution')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['constitution'] < 0 ? '' : '+'}
                  {skillsValue['constitution']}
                </b>
                &nbsp;Constitución
              </p>
            </Box>
          </Stack>
          {/* basic stats right column */}
          <Stack direction="column" width="50%" maxWidth="50%">
            {/* intelligence */}
            <Box display="flex" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['intelligence']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('intelligence')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['intelligence'] < 0 ? '' : '+'}
                  {skillsValue['intelligence']}
                </b>
                &nbsp;Inteligencia
              </p>
            </Box>
            {/* wisdom */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['wisdom']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('wisdom')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['wisdom'] < 0 ? '' : '+'}
                  {skillsValue['wisdom']}
                </b>
                &nbsp;Sabiduría
              </p>
            </Box>
            {/* charisma */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['charisma']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('charisma')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['charisma'] < 0 ? '' : '+'}
                  {skillsValue['charisma']}
                </b>
                &nbsp;Carisma
              </p>
            </Box>
          </Stack>
        </Stack>
        <Divider style={{ margin: '1vh' }} />
        {/* skills stats general stack */}
        <Stack direction="row" justifyContent="center">
          {/* skills left column */}
          <Stack
            direction="column"
            width="50%"
            maxWidth="50%"
            marginRight="-2vw"
          >
            {/* acrobatics */}
            <Box display="flex" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['acrobatics']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('acrobatics')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['acrobatics'] < 0 ? '' : '+'}
                  {skillsValue['acrobatics']}
                </b>
                &nbsp;Acrobacias
              </p>
            </Box>
            {/* animal handling */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['animal']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('animal')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['animal'] < 0 ? '' : '+'}
                  {skillsValue['animal']}
                </b>
                &nbsp;T. animales
              </p>
            </Box>
            {/* arcana */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['arcana']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('arcana')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['arcana'] < 0 ? '' : '+'}
                  {skillsValue['arcana']}
                </b>
                &nbsp;C. arcano
              </p>
            </Box>
            {/* atheltics */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['athletics']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('athletics')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['athletics'] < 0 ? '' : '+'}
                  {skillsValue['athletics']}
                </b>
                &nbsp;Atletismo
              </p>
            </Box>
            {/* deception */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['deception']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('deception')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['deception'] < 0 ? '' : '+'}
                  {skillsValue['deception']}
                </b>
                &nbsp;Engaño
              </p>
            </Box>
            {/* history */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['history']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('history')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['history'] < 0 ? '' : '+'}
                  {skillsValue['history']}
                </b>
                &nbsp;Historia
              </p>
            </Box>
            {/* insight */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['insight']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('insight')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['insight'] < 0 ? '' : '+'}
                  {skillsValue['insight']}
                </b>
                &nbsp;Perspicacia
              </p>
            </Box>
            {/* intimidation */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['intimidation']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('intimidation')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['intimidation'] < 0 ? '' : '+'}
                  {skillsValue['intimidation']}
                </b>
                &nbsp;Intimidación
              </p>
            </Box>
            {/* investigation */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['investigation']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('investigation')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['investigation'] < 0 ? '' : '+'}
                  {skillsValue['investigation']}
                </b>
                &nbsp;Investigación
              </p>
            </Box>
          </Stack>
          {/* skills right column */}
          <Stack direction="column" width="50%" maxWidth="50%">
            {/* medicine */}
            <Box display="flex" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['medicine']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('medicine')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['medicine'] < 0 ? '' : '+'}
                  {skillsValue['medicine']}
                </b>
                &nbsp;Medicina
              </p>
            </Box>
            {/* nature */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['nature']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('nature')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['nature'] < 0 ? '' : '+'}
                  {skillsValue['nature']}
                </b>
                &nbsp;Naturaleza
              </p>
            </Box>
            {/* perception */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['perception']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('perception')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['perception'] < 0 ? '' : '+'}
                  {skillsValue['perception']}
                </b>
                &nbsp;Percepción
              </p>
            </Box>
            {/* performance */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['performance']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('performance')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['performance'] < 0 ? '' : '+'}
                  {skillsValue['performance']}
                </b>
                &nbsp;Interpretación
              </p>
            </Box>
            {/* persuasion */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['persuasion']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('persuasion')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['persuasion'] < 0 ? '' : '+'}
                  {skillsValue['persuasion']}
                </b>
                &nbsp;Persuasión
              </p>
            </Box>
            {/* religion */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['religion']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('religion')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['religion'] < 0 ? '' : '+'}
                  {skillsValue['religion']}
                </b>
                &nbsp;Religión
              </p>
            </Box>
            {/* sleight of hand */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['hand']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('hand')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['hand'] < 0 ? '' : '+'}
                  {skillsValue['hand']}
                </b>
                &nbsp;J. manos
              </p>
            </Box>
            {/* stealth */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['stealth']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('stealth')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['stealth'] < 0 ? '' : '+'}
                  {skillsValue['stealth']}
                </b>
                &nbsp;Sigilo
              </p>
            </Box>
            {/* survival */}
            <Box display="flex" marginTop="-3vw" alignItems="center">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '10vw', width: '7vw' }}
                  />
                }
                checked={skillsBonus['survival']}
                sx={{
                  marginRight: '-5%',
                  height: '1vw',
                  color: 'grey',
                  '&.Mui-checked': { color: 'white' },
                }}
                onClick={() => handleBonusChange('survival')}
              />
              <p style={{ color: 'white', fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['survival'] < 0 ? '' : '+'}
                  {skillsValue['survival']}
                </b>
                &nbsp;Supervivencia
              </p>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Button
        sx={{ position: 'absolute', bottom: '-20vw' }}
        onClick={handleShowSkillsChange}
      >
        <CloseIcon />
      </Button>
      <img
        src={skills_img[0]}
        style={{
          width: '120%',
          position: 'absolute',
          top: '1vh',
          pointerEvents: 'none',
          zIndex: '-1',
        }}
        alt="skills background"
      />
    </Box>
  );
}
