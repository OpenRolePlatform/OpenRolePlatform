/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/*                          IMPORTS                              */
/* > Se importan cositas como por ejemplo funciones para acceder */
/*   a la base de datos o a otros servicios basicos.             */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

import { useEffect, useState } from "react";
import { Button, Col, Row, Space, Typography, message, Select, InputNumber } from "antd";
import MapSelector from "../../components/MapSelector";
import { MapType } from "../../models/MapModels";
import { createMap, updateMap, deleteMap } from "../../services/MapServices";
import { getCharacters } from "../../services/CharacterServices"; // NEW

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/*                          ASSETS                               */
/* > Imagenes que se utilizan en el dibujo del mapa, se pueden   */
/*   añadir mas o cambiar el dibujo en el archivo fuente.        */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

import wallImg from "../../assets/map/wall.png";
import floorImg from "../../assets/map/floor.png";
import doorImg from "../../assets/map/door.png";

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/*                 Tipos (basicamente, clases)                   */
/* > Se crean las clases basicas para definir un mapa y sus      */
/*   elementos, asi como herramientas para modificarlos.         */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

export type BackgroundTokenType = "wall" | "floor" | "door";
export interface BackgroundToken {
  x: number;
  y: number;
  type: BackgroundTokenType;
}

export interface ForegroundToken {
  id: string;
  x: number;
  y: number;
  characterId: string;
}

type ToolType =
  | { mode: "background"; token: BackgroundTokenType }
  | { mode: "foreground"; characterId: string }
  | { mode: "erase-background" }
  | { mode: "erase-foreground" };

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/*                        ESTADOS                                */
/* > Variables que se utilizan en diversas funciones.            */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

export default function MapEditorPage() {

  /* > Listas de mapas de backend. */
  const [maps, setMaps] = useState<MapType[]>([]);

  /* > Mapa actualmente cargado. */
  const [currentMap, setCurrentMap] = useState<MapType | null>(null);

  /* > Personajes y tiles colocadas en el mapa. */
  const [background, setBackground] = useState<BackgroundToken[]>([]);
  const [foreground, setForeground] = useState<ForegroundToken[]>([]);

  /* > Lista de personajes de backend. */
  const [characters, setCharacters] = useState([]); // NEW

  /* > Herramienta actualmente activa. */
  const [tool, setTool] = useState<ToolType | null>(null);

  /* > Que personaje esta seleccionado para editar. */
  const [selectedForegroundId, setSelectedForegroundId] = useState<string | null>(null);

  /* > Las url ligadas a cada tipo de background tile. */
  const bgImages = {
    wall: wallImg,
    floor: floorImg,
    door: doorImg,
  };

  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
  /*                         USE EFFECT                            */
  /* > Carga mapas de prueba desde el backend, ademas de cargar    */
  /*   tambien a los personajes del backend y corregir las url de  */
  /*   sus imagenes de perfil.                                     */
  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  useEffect(() => {

    // MAPAS STANDARD PARA EDITAR Y TAL
    setMaps([
      { _id: "1", name: "Dungeon Level 1", width: 10, height: 10, tokens: { background: [], foreground: [] } },
      { _id: "2", name: "Forest", width: 10, height: 10, tokens: { background: [], foreground: [] } },
    ]);

    // NO TOCAR, LA URL DE LAS IMAGENES DE LOS PERSONAJES ME HA PETADO DEMASIADO
    // SI NO CARGA; CAMBIAR EL PUERTO DEL HOST EN finalURL
    getCharacters().then((data) => {
      const corrected = data.map((c) => {
        let img = c.image;
        if (!img) return c;
        img = img.replace(/\\/g, "/");
        if (img.startsWith("http://") || img.startsWith("https://")) {
          return { ...c, image: img };
        }
        img = img.replace(/(\/?upload\/images\/)+/, "upload/images/");
        const finalUrl = `http://localhost:3001/upload/${img}`;
        return { ...c, image: finalUrl };
      });

      console.log(corrected);
      setCharacters(corrected);
    });



  }, []);

  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
  /*                     INTERACCION CON BACKEND                   */
  /* > Estas funciones se encargan de interactuar con el backend.  */
  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  /* > Carga el mapa y lo rellena con lo que tenía guardado. */
  const handleSelectMap = (map) => {
    setCurrentMap(map);
    setBackground(map.tokens?.background || []);
    setForeground(map.tokens?.foreground || []);
    setSelectedForegroundId(null);
  };

  /* > Crea un mapa nuevo en el backend. */
  const handleCreateNew = async () => {
    const payload = {
      _id: String(Date.now()),
      name: "New Map",
      width: 10,
      height: 10,
      tokens: { background: [], foreground: [] },
    };

    try {
      const created = await createMap(payload);
      setMaps([...maps, created]);
      setCurrentMap(created);
      setBackground([]);
      setForeground([]);
      message.success("Map created!");
    } catch {
      message.error("Failed to create map");
    }
  };

  /* > Guarda los cambios en el backend. */
  const handleSave = async () => {
    if (!currentMap) return;

    const updated = {
      ...currentMap,
      tokens: { background, foreground },
    };

    try {
      await updateMap(currentMap._id, updated);
      setCurrentMap(updated);
      message.success("Map saved!");
    } catch {
      message.error("Failed to save map");
    }
  };

  /* > Elimina el mapa del backend. */
  const handleDelete = async () => {
    if (!currentMap) return;

    try {
      await deleteMap(currentMap._id);
      setMaps(maps.filter((m) => m._id !== currentMap._id));
      setCurrentMap(null);
      setBackground([]);
      setForeground([]);
      message.success("Map deleted!");
    } catch {
      message.error("Failed to delete map");
    }
  };
  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
  /*                    INTERACCION CON EL MAPA                    */
  /* > Aqui se trata todo lo que tiene que ver con interactuar de  */
  /*   forma directa con el mapa.                                  */
  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  // ACTUALIZADOR DE MAPA AL HACER CLICKITY CLICKITY
  const handleCellClick = (x, y) => {
    if (!tool) return;

    if (tool.mode === "erase-background") {
      setBackground(background.filter((b) => b.x !== x || b.y !== y));
      return;
    }

    if (tool.mode === "erase-foreground") {
      setForeground(foreground.filter((f) => !(f.x === x && f.y === y)));
      return;
    }

    if (tool.mode === "background") {
      setBackground([
        ...background.filter((b) => b.x !== x || b.y !== y),
        { x, y, type: tool.token },
      ]);
      return;
    }

    if (tool.mode === "foreground") {
      const existing = foreground.find((f) => f.x === x && f.y === y);
      if (existing) return;

      const newUnit = {
        id: String(Date.now()),
        x,
        y,
        characterId: tool.characterId,
      };

      setForeground([...foreground, newUnit]);
      setSelectedForegroundId(newUnit.id);
    }
  };

  const selectedForeground = foreground.find((f) => f.id === selectedForegroundId);

  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
  /*                      TAMANY MAPA                              */
  /* > Trata todo lo que tiene que ver con el resize del mapa.     */
  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
  const updateDimensions = (width, height) => {
    if (!currentMap) return;

    const newWidth = width ?? currentMap.width;
    const newHeight = height ?? currentMap.height;

    setBackground((bg) => bg.filter((b) => b.x < newWidth && b.y < newHeight));
    setForeground((fg) => fg.filter((f) => f.x < newWidth && f.y < newHeight));

    setCurrentMap({
      ...currentMap,
      width: newWidth,
      height: newHeight,
    });
  };


  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
  /*                        RENDERING                              */
  /* > Esto es todo el apartado visual y de botones.               */
  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  return (
    <div style={{ padding: 16 }}>
      <MapSelector maps={maps} onSelectMap={handleSelectMap} onCreateNew={handleCreateNew} />

      <Space style={{ marginTop: 16 }}>
        <Select
          placeholder="Background tools"
          style={{ width: 160 }}
          onChange={(v) => setTool({ mode: "background", token: v })}
          options={[
            { value: "wall", label: "Wall" },
            { value: "floor", label: "Floor" },
            { value: "door", label: "Door" },
          ]}
        />

        <Select
          placeholder="Characters"
          style={{ width: 200 }}
          onChange={(v) => setTool({ mode: "foreground", characterId: v })}
          options={characters.map((c) => ({ value: c._id, label: c.name }))}
        />

        <Button onClick={() => setTool({ mode: "erase-background" })}>Erase Background</Button>
        <Button onClick={() => setTool({ mode: "erase-foreground" })}>Erase Foreground</Button>
      </Space>

      {currentMap && (
        <div style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col flex="auto">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${currentMap.width}, 60px)`,
                  gridTemplateRows: `repeat(${currentMap.height}, 60px)`,
                  gap: 2,
                  backgroundColor: "#ccc",
                  border: "2px solid #888",
                  borderRadius: 8,
                }}
              >
                {Array.from({ length: currentMap.height }).map((_, row) =>
                  Array.from({ length: currentMap.width }).map((_, col) => {
                    const bg = background.find((b) => b.x === col && b.y === row);
                    const fg = foreground.find((f) => f.x === col && f.y === row);

                    const character = characters.find((c) => c._id === fg?.characterId);

                    return (
                      <div
                        key={`${col}-${row}`}
                        onClick={() => handleCellClick(col, row)}
                        style={{
                          width: 60,
                          height: 60,
                          backgroundColor: bg ? "#ddd" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #999",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {bg && (
                          <img
                            src={bgImages[bg.type]}
                            alt={bg.type}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              opacity: 0.9,
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          />
                        )}

                        {fg && character && (
                          <>
                            <img

                              src={character.image}
                              //alt={character.avatar}
                              style={{
                                width: "80%",
                                height: "80%",
                                objectFit: "contain",
                                position: "absolute",
                                top: "10%",
                                left: "10%",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 2,
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.6)", // fondo semitransparente
                                color: "#fff",
                                fontSize: 10,
                                padding: "1px 4px",
                                borderRadius: 3,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {character.name}
                            </div>
                          </>
                        )}

                      </div>
                    );
                  })
                )}
              </div>
            </Col>

            <Col flex="250px">
              <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 8, height: "620px", overflowY: "auto" }}>
                <Typography.Title level={5}>Map Properties</Typography.Title>

                <p><b>Width</b></p>
                <InputNumber min={5} max={100} value={currentMap.width} onChange={(v) => updateDimensions(v, currentMap.height)} />

                <p style={{ marginTop: 12 }}><b>Height</b></p>
                <InputNumber min={5} max={100} value={currentMap.height} onChange={(v) => updateDimensions(currentMap.width, v)} />

                <Typography.Title level={5} style={{ marginTop: 16 }}>Selected Character</Typography.Title>

                {selectedForeground ? (
                  <div>
                    <p><b>ID:</b> {selectedForeground.id}</p>
                    <p><b>Character:</b> {characters.find((c) => c._id === selectedForeground.characterId)?.name}</p>
                    <p><b>Position:</b> ({selectedForeground.x}, {selectedForeground.y})</p>
                  </div>
                ) : (
                  <p>No character selected</p>
                )}

                <Space direction="vertical" style={{ marginTop: 16 }}>
                  <Button danger disabled={!selectedForeground}>Delete Foreground Token</Button>

                  <Button type="primary" onClick={handleSave}>Save Map</Button>
                  <Button danger onClick={handleDelete}>Delete Map</Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
