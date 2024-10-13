const backendUrl = "http://localhost:3001"

const putCharacterStats = async (req, res) => {
    const {character,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma} = req
    try {
        const userData = {
            character: character,
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma 
        }
        const response = await fetch(`${backendUrl}/putCharacterStats`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            console.error("An unexpected error ocurred while trying to update your stats")
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.error("Error at character stats."+error)
        alert("An unexpected error ocurred while trying to update your stats")
    }
}

const putOtherCharacterStats = async (req, res) => {
    const {character,
            ac,
            movement,
            bonus} = req
    try {
        const userData = {
            character: character,
            ac: ac,
            movement: movement,
            bonus: bonus
        }
        const response = await fetch(`${backendUrl}/putOtherCharacterStats`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            console.error("An unexpected error ocurred while trying to update your stats")
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.error("Error at character other stats."+error)
        alert("An unexpected error ocurred while trying to update your stats")
    }
}

const putHpStats = async (req, res) => {
    const {character,
        hp,
        hpTemp,
        hpPool} = req
    try {
        const userData = {
            character: character,
            hp: hp,
            hpTemp: hpTemp,
            hpPool: hpPool
        }
        const response = await fetch(`${backendUrl}/putHpStats`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            console.error("An unexpected error ocurred while trying to update your hp")
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.error("Error at character hp."+error)
        alert("An unexpected error ocurred while trying to update your hp")
    }
}

const putSkillsStats = async (req, res) => {
    const {character,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            acrobatics,
            animal,
            arcana,
            athletics,
            deception,
            history,
            insight,
            intimidation,
            investigation,
            medicine,
            nature,
            perception,
            performance,
            persuasion,
            religion,
            hand,
            stealth,
            survival} = req
    try {
        const userData = {
            character: character,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            acrobatics,
            animal,
            arcana,
            athletics,
            deception,
            history,
            insight,
            intimidation,
            investigation,
            medicine,
            nature,
            perception,
            performance,
            persuasion,
            religion,
            hand,
            stealth,
            survival
        }
        const response = await fetch(`${backendUrl}/putSkillsStats`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            console.error("An unexpected error ocurred while trying to update your skills")
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.error("Error at character skills."+error)
        alert("An unexpected error ocurred while trying to update your skills")
    }
}



module.exports = {  putCharacterStats, 
                    putOtherCharacterStats,
                    putHpStats,  
                    putSkillsStats,
                }