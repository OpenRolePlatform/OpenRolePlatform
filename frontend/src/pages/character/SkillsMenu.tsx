//react imports
import { Button, Flex, List, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { Hexagon, Plus } from '@phosphor-icons/react';
import { Hex } from '../../assets/Icons';
import { Skill, SkillsSources, Stat } from '../../models/CharacterModels';
import { CharacterService } from '../../services/useCharacter';
import { getAllSkillBonus } from '../../utils/data';

const basicSkillsFontSize = '3vw';

export default function SkillsMenu(props: { character: CharacterService }) {
  const [skillsValue, setSkillsValue] = useState<{
    [key in Skill]?: number | undefined;
  }>({
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

  /* skill bonus calculation */
  useEffect(() => {
    setSkillsValue(
      getAllSkillBonus(
        props.character.stats(),
        props.character.skills(),
        props.character.other().bonus,
      ),
    );
  }, [props.character]);

  const getStat = (skill: string) => {
    const result = Object.keys(SkillsSources).find((stat) =>
      SkillsSources[stat as Stat].includes(skill),
    );
    return result;
  };

  return (
    <>
      <List
        size="small"
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 2 }}
      >
        {Object.keys(skillsValue).map((skill: string, index: number) => (
          <>
            <List.Item style={{ padding: 0 }}>
              <List.Item.Meta
                avatar={
                  <Button
                    type="text"
                    shape="circle"
                    icon={
                      props.character.skills()[skill as Skill] ? (
                        <Hexagon
                          color="currenColor"
                          size="2rem"
                          weight="duotone"
                        />
                      ) : (
                        Hex
                      )
                    }
                    className={`skill-check ${props.character.skills()[skill as Skill] && 'skill-check--active'}`}
                    onClick={() =>
                      props.character.updateSkills({
                        [skill]: !props.character.skills()[skill as Skill],
                      })
                    }
                  />
                }
                title={
                  <>
                    <Typography.Text>
                      <Flex align="baseline">
                        {skillsValue[skill] > 0 && (
                          <Plus color="currentColor" weight="bold" size={12} />
                        )}
                        {skillsValue[skill]}
                      </Flex>
                    </Typography.Text>
                  </>
                }
                description={
                  <>
                    <Typography.Text type="secondary">
                      {skill.toUpperCase()}
                    </Typography.Text>{' '}
                    <Typography.Text italic>({getStat(skill)})</Typography.Text>
                  </>
                }
              />
            </List.Item>
          </>
        ))}
      </List>
    </>
  );
}
