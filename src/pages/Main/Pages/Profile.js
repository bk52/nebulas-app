import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Grid, GridColumn, Label, Icon, Button } from 'semantic-ui-react';
import Avatars from '../../../components/Avatars';
import Ach from '../../../components/Achievements';

const Pages = {
    'NewGalaxy': 4,
    'Friends': 5,
    'Achievements': 6,
    'BankAccount': 7,
    'Skills': 8,
    'Search': 9,
    'Notifications': 10,
    'Interests': 11,
    'GalaxyDetails': 12
}

const Header = ({ User, onSubPage }) => {
    return <Grid className='settings-grid' style={{ 'height': '100px', 'padding': '0px', 'margin': '0px' }}>
        <Grid.Row style={{ 'height': '100px', 'padding': '0px', 'margin': '0px' }}>
            <Grid.Column width={6} verticalAlign='middle'>
                <img style={{ 'width': '90px', 'height': '90px', 'borderRadius': '45px' }} src={Avatars[User.avatar]} />
            </Grid.Column>
            <Grid.Column width={10} verticalAlign='middle' textAlign='left'>
                <Grid.Row style={{ 'fontSize': '18px', 'fontWeight': 'bold', 'marginTop': '8px', 'color': '#FFFFFF' }}>{User.name}</Grid.Row>
                <Grid.Row style={{ 'marginTop': '8px', 'color': '#C4C4C4' }}>{User.bio}</Grid.Row>
                <Grid.Row style={{ 'marginTop': '8px' }}>
                    <a onClick={(e) => { e.preventDefault(); onSubPage(Pages.Friends, { type: 'fl' }) }} style={{ 'color': '#F72585', 'marginRight': '16px', 'cursor': 'pointer' }}>{User.stats.following} following</a>
                    <a onClick={(e) => { e.preventDefault(); onSubPage(Pages.Friends, { type: 'fr' }) }} style={{ 'color': '#4CC9F0', 'cursor': 'pointer' }}>{User.stats.followers} followers</a></Grid.Row>
            </Grid.Column>
        </Grid.Row>
    </Grid>
}

const Achievements = ({ User, onSubPage }) => {
    return <div className='settings-grid' style={{ 'height': '120px', 'marginTop': '16px', 'textAlign': 'left' }}>
        <Label color='purple' ribbon>Achievements</Label>
        <div style={{ 'width': '100%', 'overflowX': 'scroll', 'display': 'flex', 'marginTop': '16px', 'paddingLeft': '4px', 'paddingRight': '4px' }}>
            {
                User.achievements.map((a, i) => {
                    return <img onClick={() => onSubPage(Pages.Achievements, { type: a })} key={i} src={Ach[a]} style={{ 'height': '60px', 'width': 'auto', 'cursor': 'pointer', 'marginRight': '8px' }} />
                })
            }
        </div>
    </div>
}

const Statistics = ({ User }) => {
    return <Grid className='settings-grid' style={{ 'padding': '0px', 'margin': '0px', 'marginTop': '16px' }} divided inverted>
        <Label color='purple' ribbon>Statistics</Label>
        <Grid.Row columns={2} style={{ 'height': '75px' }}>
            <GridColumn style={{ 'color': '#F72585' }}>
                <div style={{ 'fontSize': '36px', 'fontWeight': 'bold', 'marginBottom': '8px' }}>{User.stats.created}</div>
                <div>Created</div>
            </GridColumn>
            <GridColumn style={{ 'color': '#4CC9F0' }}>
                <div style={{ 'fontSize': '36px', 'fontWeight': 'bold', 'marginBottom': '8px' }}>{User.stats.contributed}</div>
                <div>Contributed</div>
            </GridColumn>
        </Grid.Row>
    </Grid>
}

const Wallet = ({ User, onSubPage }) => {
    return <div className='settings-grid' style={{ 'height': '100px', 'marginTop': '16px', 'textAlign': 'left' }}>
        <Label as='a' color='purple' ribbon>Wallet</Label>
        <div style={{ 'width': '100%', 'overflowX': 'scroll', 'display': 'flex', 'marginTop': '16px', 'paddingLeft': '4px', 'paddingRight': '4px' }}>
            {
                User.wallet.map((w, i) => {
                    const color = w.type === 'Dollar' ? '#21BA45' : '#EE9B00';
                    const icon = w.type === 'Dollar' ? 'dollar' : 'bitcoin';
                    return <div onClick={() => { onSubPage(Pages.BankAccount, { type: w.type, value: w.balance }) }} key={i} style={{ 'width': '120px', 'height': '50px', 'borderRadius': '4px', 'display': 'flex', 'color': '#ffffff', 'backgroundColor': `${color}`, 'marginRight': '8px', 'cursor': 'pointer' }}>
                        <div style={{ 'width': '40px', 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}><Icon name={`${icon}`} size='big' /></div>
                        <div style={{ 'width': 'calc(100% - 40px)', 'height': '100%', 'paddingTop': '4px' }}>
                            <div style={{ 'fontWeight': 'bold' }}>{w.type}</div>
                            <div style={{ 'fontSize': '12px' }}>{w.balance} {w.unit}</div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

const Skills = ({ User, onSubPage }) => {
    const dispatch = useDispatch();
    return <div className='settings-grid' style={{ 'marginTop': '16px', 'textAlign': 'left' }}>
        <Label color='purple' ribbon>Skills</Label>
        <div style={{ 'width': '100%', 'marginTop': '16px', 'paddingLeft': '4px', 'paddingRight': '4px', 'paddingBottom': '4px' }}>
            {User.skills.map((s, i) => {
                return <Label key={i} color='green' style={{ 'marginBottom': '4px' }}>
                    {s.title}
                    <Icon name='delete' onClick={() => dispatch({ type: 'USER_REMOVE_SKILL', payload: { id: s.id } })} />
                </Label>
            })}
        </div>
        <Button onClick={() => { onSubPage(Pages.Skills, {}) }} icon labelPosition='left' className='btn-sign-in' style={{ 'marginTop': '8px' }}><Icon name='plus' />Add Skill</Button>
    </div>
}

const Interests = ({ User, onSubPage }) => {
    const dispatch = useDispatch();
    return <div className='settings-grid' style={{ 'marginTop': '16px', 'textAlign': 'left' }}>
        <Label as='a' color='purple' ribbon>Interests</Label>
        <div style={{ 'width': '100%', 'marginTop': '16px', 'paddingLeft': '4px', 'paddingRight': '4px', 'paddingBottom': '4px' }}>
            {User.interests.map((s, i) => {
                return <Label key={i} color='pink' style={{ 'marginBottom': '4px' }}>
                    {s.title}
                    <Icon name='delete' onClick={() => dispatch({ type: 'USER_REMOVE_INTEREST', payload: { id: s.id } })} />
                </Label>
            })}
        </div>
        <Button onClick={() => { onSubPage(Pages.Interests, {}) }} icon labelPosition='left' className='btn-sign-in' style={{ 'marginTop': '8px' }}><Icon name='plus' />Add Interest</Button>
    </div>
}

const Profile = ({ onSubPage }) => {
    const UserState = useSelector(state => state.user);

    return <>
        <Header User={UserState} onSubPage={onSubPage} />
        <Achievements User={UserState} onSubPage={onSubPage} />
        <Statistics User={UserState} />
        <Wallet User={UserState} onSubPage={onSubPage} />
        <Skills User={UserState} onSubPage={onSubPage} />
        <Interests User={UserState} onSubPage={onSubPage} />
    </>
}

export default Profile;