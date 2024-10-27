import { Avatar, Card, Col, List, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { ClassLogos } from '../assets/Images';
import { charactersExamples } from '../models/CharacterModels';

const BREAKPOINTS = { mobile: 0, tablet: 576, desktop: 1280 };

export default function Characters() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <>
      {breakpoint === 'mobile' ? (
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={charactersExamples}
          renderItem={(character) => (
            <List.Item onClick={() => navigate(`/character/${character.name}`)}>
              <List.Item.Meta
                avatar={
                  character.image ? (
                    <Avatar size="large" src={character.image} />
                  ) : (
                    <Avatar size="large" src={ClassLogos[character.class]} />
                  )
                }
                title={character.name}
              />
            </List.Item>
          )}
        />
      ) : (
        <Row align="middle" justify="space-between" gutter={[12, 12]}>
          {charactersExamples.map((character, index) => (
            <Col
              key={`col-${index}`}
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '33%' }}
              lg={{ flex: '20%' }}
              xl={{ flex: '20%' }}
            >
              <Card
                cover={
                  character.image ? (
                    <img src={character.image} />
                  ) : (
                    <img src={ClassLogos[character.class]} />
                  )
                }
                onClick={() => navigate(`/character/${character.name}`)}
              >
                <h3>{character.name}</h3>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
