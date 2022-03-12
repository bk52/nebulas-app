import React, { useEffect, useState } from 'react';
import { Select, Input, Form, List, Image, Label } from 'semantic-ui-react';
import Galaxies from '../../../fakeData/Galaxies';
import Users from '../../../fakeData/Users';
import Avatars from '../../../components/Avatars';
import ErrorPage from '../../../components/ErrorPage';


const SEARCH_TYPE = {
    'user': 1,
    'galaxy': 2,
    'skill': 3
}

const options = [
    { key: 1, value: 1, text: 'User' },
    { key: 2, value: 2, text: 'Galaxy' },
    { key: 3, value: 3, text: 'Skill' },
]

const SearchData = () => {
    const [searchType, setsearchType] = useState(SEARCH_TYPE.user);
    const [data, setData] = useState([]);

    useEffect(() => { }, [])

    const onSearchChange = (e, { value }) => {
        try {
            if (value == '') setData([])
            else {
                let filtered = [];
                if (searchType == SEARCH_TYPE.galaxy) {
                    filtered = Galaxies.filter(x => x.title.toLowerCase().indexOf(value.toLowerCase()) > -1)
                }
                else {
                    if (searchType == SEARCH_TYPE.skill) {
                        filtered = Users.filter(x => x.skills.join('').toLowerCase().indexOf(value.toLowerCase()) > -1)
                    }
                    else if (searchType == SEARCH_TYPE.user) {
                        filtered = Users.filter(x => x.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
                    }
                }
                setData(filtered)
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    try {
        return <>
            <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Search</div>

            <div style={{ textAlign: 'left', width: '100%' }}>
                <Form style={{ width: '350px' }}>
                    <Form.Field>
                        <label style={{ color: '#0A9396' }}>Search For</label>
                        <Select className='search' placeholder='Select a search type' options={options} value={searchType} onChange={((e, { value }) => setsearchType(value))} />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ color: '#0A9396' }}>Search Text</label>
                        <Input placeholder='Search' className='login' icon={'search'} iconPosition='left' onChange={onSearchChange} />
                    </Form.Field>
                </Form>
                <List divided verticalAlign='middle'>
                    {
                        (searchType == SEARCH_TYPE.user || searchType == SEARCH_TYPE.skill) && data.map((u, i) => {
                            return <List.Item key={i}>
                                <Image avatar src={Avatars[u.avatar]} />
                                <List.Content>{u.name}</List.Content>
                                {
                                    searchType == SEARCH_TYPE.skill && <List.Description>
                                        {u.skills.map((s, si) => { return <Label key={si} color='green' style={{ 'marginBottom': '4px' }}>{s}</Label> })}
                                    </List.Description>
                                }
                            </List.Item>
                        })
                    }
                    {
                        (searchType == SEARCH_TYPE.galaxy) && data.map((u, i) => {
                            return <List.Item key={i}>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <img src={u.image} style={{ width: '100px', marginRight: '12px' }} />
                                    <List.Content>{u.title}</List.Content>
                                </div>
                            </List.Item>
                        })
                    }
                </List>
            </div>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default SearchData;