import { Card, Col, Row, Skeleton, Splitter } from 'antd';
import { Character } from '../models/CharacterModels';
import { getCharacters } from '../services/CharacterServices';
import { useDynamicList } from '../services/useDynamicList';
import { CharacterCard } from './character/CharacterCard';
import Notes from './Notes';

export default function Dashboard() {
  const characters = useDynamicList<Character>('character', getCharacters);

  return (
    <>
      <Splitter layout="vertical" style={{ height: '90vh' }}>
        <Splitter.Panel defaultSize="50%">
          <Row align="middle" gutter={[12, 12]}>
            {characters.data.map((character, index) => (
              <Col
                key={`col-${index}`}
                xs={{ flex: '100%' }}
                sm={{ flex: '50%' }}
                md={{ flex: '33%' }}
              >
                {characters.loading ? (
                  <Card
                    style={{ height: '100%' }}
                    cover={<Skeleton.Node style={{ width: '100%' }} active />}
                  >
                    <Skeleton.Input style={{ width: '100%' }} active />
                  </Card>
                ) : (
                  <CharacterCard id={character._id}></CharacterCard>
                )}
              </Col>
            ))}
          </Row>
        </Splitter.Panel>
        <Splitter.Panel defaultSize="50%">
          <Notes></Notes>
        </Splitter.Panel>
      </Splitter>
    </>
  );
}
