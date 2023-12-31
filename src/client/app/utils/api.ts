export async function fetchLabels() {
    try {
        const response = await fetch('http://localhost:3030/api/labels')
        if (response.ok) {
            const data = await response.json()
            //console.log(data)
            return data
        } else {
            throw new Error('error to find labels')
        }
    } catch (error) {
        console.error(error)
    }
}


export async function fetchUsers() {
    try{
        const response = await fetch('h')
    } catch (error) {
        console.log(error)
    }
}

export async function selectLabel(labelIdIssue: number){

    try{
        const labels = await fetch()
    }
    const selected = labels.find(selected => selected.id === labelIdIssue)
    return selected
  }