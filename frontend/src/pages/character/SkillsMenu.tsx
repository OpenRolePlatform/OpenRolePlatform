//react imports
import { useEffect, useState } from 'react';
//@mui imports
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
//@mui icons imports
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Col, Descriptions, Row, Space } from 'antd';
import { StatsList } from '../../models/CharacterModels';
import { CharacterService } from '../../services/useCharacter';
import {
  getAllBonusNum,
  getAllSkillBonus,
  getBonusValueNum,
} from '../../utils/data';

const skills_img = ['img/skills_border.png'];

const basicSkillsFontSize = '3vw';

export default function SkillsMenu(props: { character: CharacterService }) {
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

  /* first database info getter */
  /*  useEffect(() => {
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
 */
  /* skills */
  /*  useEffect(() => {
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
  }, [skillsBonus, skillsSwitch, skillsReSwitch]); */

  /* skill bonus calculation */
  useEffect(() => {
    const statsBonus = getAllBonusNum(props.character.stats());
    const resultStr = getBonusValueNum(props.character.stats().strength);
    const resultDex = getBonusValueNum(props.character.stats().dexterity);
    const resultCon = getBonusValueNum(props.character.stats().constitution);
    const resultInt = getBonusValueNum(props.character.stats().intelligence);
    const resultWis = getBonusValueNum(props.character.stats().wisdom);
    const resultCha = getBonusValueNum(props.character.stats().charisma);

    const skillsBonuses = getAllSkillBonus(
      props.character.stats(),
      props.character.skills(),
      props.character.other().bonus,
    );
    console.log(skillsBonuses);

    const auxSkills = {};
    const bonus = props.character.other().bonus;
    auxSkills['strength'] =
      resultStr +
      (props.character.skills()['strength'] ? Number(bonus) : Number(0));
    auxSkills['dexterity'] =
      resultDex +
      (props.character.skills()['dexterity'] ? Number(bonus) : Number(0));
    auxSkills['constitution'] =
      resultCon +
      (props.character.skills()['constitution'] ? Number(bonus) : Number(0));
    auxSkills['intelligence'] =
      resultInt +
      (props.character.skills()['intelligence'] ? Number(bonus) : Number(0));
    auxSkills['wisdom'] =
      resultWis +
      (props.character.skills()['wisdom'] ? Number(bonus) : Number(0));
    auxSkills['charisma'] =
      resultCha +
      (props.character.skills()['charisma'] ? Number(bonus) : Number(0));
    auxSkills['acrobatics'] =
      resultDex +
      (props.character.skills()['acrobatics'] ? Number(bonus) : Number(0));
    auxSkills['animal'] =
      resultWis +
      (props.character.skills()['animal'] ? Number(bonus) : Number(0));
    auxSkills['arcana'] =
      resultInt +
      (props.character.skills()['arcana'] ? Number(bonus) : Number(0));
    auxSkills['athletics'] =
      resultStr +
      (props.character.skills()['athletics'] ? Number(bonus) : Number(0));
    auxSkills['deception'] =
      resultCha +
      (props.character.skills()['deception'] ? Number(bonus) : Number(0));
    auxSkills['history'] =
      resultInt +
      (props.character.skills()['history'] ? Number(bonus) : Number(0));
    auxSkills['insight'] =
      resultWis +
      (props.character.skills()['insight'] ? Number(bonus) : Number(0));
    auxSkills['intimidation'] =
      resultCha +
      (props.character.skills()['intimidation'] ? Number(bonus) : Number(0));
    auxSkills['investigation'] =
      resultInt +
      (props.character.skills()['investigation'] ? Number(bonus) : Number(0));
    auxSkills['medicine'] =
      resultWis +
      (props.character.skills()['medicine'] ? Number(bonus) : Number(0));
    auxSkills['nature'] =
      resultInt +
      (props.character.skills()['nature'] ? Number(bonus) : Number(0));
    auxSkills['perception'] =
      resultWis +
      (props.character.skills()['perception'] ? Number(bonus) : Number(0));
    auxSkills['performance'] =
      resultCha +
      (props.character.skills()['performance'] ? Number(bonus) : Number(0));
    auxSkills['persuasion'] =
      resultCha +
      (props.character.skills()['persuasion'] ? Number(bonus) : Number(0));
    auxSkills['religion'] =
      resultInt +
      (props.character.skills()['religion'] ? Number(bonus) : Number(0));
    auxSkills['hand'] =
      resultDex +
      (props.character.skills()['hand'] ? Number(bonus) : Number(0));
    auxSkills['stealth'] =
      resultDex +
      (props.character.skills()['stealth'] ? Number(bonus) : Number(0));
    auxSkills['survival'] =
      resultWis +
      (props.character.skills()['survival'] ? Number(bonus) : Number(0));
    setSkillsValue({ ...auxSkills });
    console.log(skillsValue);
  }, [props.character, skillsBonus]);

  return (
    <>
      {/* text box */}
      <Space direction="vertical">
        {/* basic stats row */}
        <Descriptions>
          {StatsList.map((stat) => (
            <>
              <Descriptions.Item label={stat}>
                {props.character.stats()[stat]}
              </Descriptions.Item>
            </>
          ))}
        </Descriptions>
        <Row justify="space-around">
          {/* basic stats left column */}
          <Col>
            {/* strength */}
            <Row align="middle">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['strength']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('strength')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['strength'] < 0 ? '' : '+'}
                  {skillsValue['strength']}
                </b>
                &nbsp;Fuerza
              </p>
            </Row>
            {/* dexterity */}
            <Row align="middle">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['dexterity']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('dexterity')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['dexterity'] < 0 ? '' : '+'}
                  {skillsValue['dexterity']}
                </b>
                &nbsp;Destreza
              </p>
            </Row>
            {/* constitution */}
            <Row align="middle">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['constitution']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('constitution')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['constitution'] < 0 ? '' : '+'}
                  {skillsValue['constitution']}
                </b>
                &nbsp;Constitución
              </p>
            </Row>
          </Col>
          {/* basic stats right column */}
          <Col>
            {/* intelligence */}
            <Row align="middle">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['intelligence']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('intelligence')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['intelligence'] < 0 ? '' : '+'}
                  {skillsValue['intelligence']}
                </b>
                &nbsp;Inteligencia
              </p>
            </Row>
            {/* wisdom */}
            <Row align="middle">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['wisdom']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('wisdom')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['wisdom'] < 0 ? '' : '+'}
                  {skillsValue['wisdom']}
                </b>
                &nbsp;Sabiduría
              </p>
            </Row>
            {/* charisma */}
            <Row align="middle">
              <Checkbox
                icon={
                  <SentimentVeryDissatisfiedIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['charisma']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('charisma')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['charisma'] < 0 ? '' : '+'}
                  {skillsValue['charisma']}
                </b>
                &nbsp;Carisma
              </p>
            </Row>
          </Col>
        </Row>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['acrobatics']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('acrobatics')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['animal']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('animal')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['arcana']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('arcana')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['athletics']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('athletics')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['deception']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('deception')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['history']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('history')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['insight']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('insight')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['intimidation']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('intimidation')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['investigation']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('investigation')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['medicine']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('medicine')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['nature']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('nature')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['perception']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('perception')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['performance']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('performance')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['persuasion']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('persuasion')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['religion']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('religion')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['hand']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('hand')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['stealth']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('stealth')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
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
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checkedIcon={
                  <SentimentSatisfiedAltIcon
                    style={{ height: '5vw', width: '5vw' }}
                  />
                }
                checked={skillsBonus['survival']}
                sx={{
                  color: 'grey',
                }}
                //onClick={() => handleBonusChange('survival')}
              />
              <p style={{ fontSize: `${basicSkillsFontSize}` }}>
                <b>
                  {skillsValue['survival'] < 0 ? '' : '+'}
                  {skillsValue['survival']}
                </b>
                &nbsp;Supervivencia
              </p>
            </Box>
          </Stack>
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
        </Stack>
      </Space>
    </>
  );
}
