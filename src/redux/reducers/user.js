import { types } from "../constants/action-types";

var initialState = {
    id: 'TNwsWhjseL',
    name: 'Barış KARAMUSTAFA',
    avatar: 'avatar6',
    bio: 'Guardian of Galaxy',
    stats: {
        followers: 3,
        following: 2,
        created: 1,
        contributed: 16
    },
    wallet: [
        { type: 'Dollar', balance: 248.75, unit: 'USD' },
        { type: 'Bitcoin', balance: 0.1580, unit: 'BTC' },
    ],
    achievements: ["Ach1", "Ach2", "Ach6"],
    followers: [
        { id: '6tI6vo3GET', name: 'Thomas A. Parker', avatar: 'avatar2' },
        { id: 'rS4r9xOBaZ', name: 'Edna Riley', avatar: 'avatar3' },
        { id: 'IJXoLnj90d', name: 'Robert Wilson', avatar: 'avatar4' }
    ],
    following: [
        { id: '6tI6vo3GET', name: 'Thomas A. Parker', avatar: 'avatar2' },
        { id: 'IJXoLnj90d', name: 'Robert Wilson', avatar: 'avatar4' }
    ],
    skills: [
        { id: 1, title: 'App Development' },
        { id: 2, title: 'Machine Learning' },
        { id: 3, title: 'React' },
        { id: 4, title: 'Figma' },
        { id: 5, title: 'Node' },
        { id: 6, title: 'Javascript' },
        { id: 7, title: 'Web Development' },
    ],
    interests: [
        { id: 1, title: 'Robotics' },
        { id: 2, title: 'Computer Science' },
        { id: 3, title: 'Global Warming' },
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_REMOVE_SKILL':
            return Object.assign({}, state, {
                skills: state.skills.filter(s => s.id != action.payload.id)
            });
        case 'USER_ADD_SKILL':
            return Object.assign({}, state, {
                skills: [...state.skills, ...action.payload.skills]
            });
        case 'USER_REMOVE_INTEREST':
            return Object.assign({}, state, {
                interests: state.interests.filter(s => s.id != action.payload.id)
            });
        case 'USER_ADD_INTEREST':
            return Object.assign({}, state, {
                interests: [...state.interests, ...action.payload.interests]
            });
        default: return state;
    }
}