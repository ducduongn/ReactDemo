import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation, userLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header>
            <h1 >{title}</h1>
            {location.pathname === '/' && <Button 
                color={showAdd ? 'red' : 'green'} 
                text={showAdd ? 'Close' : 'Add'}
                onClick = {onAdd}
            ></Button>}
        </header>
    )
}

Header.defaultProps = {
    title: 'UET JCIA', 
}

Header.prototype = {
    title: PropTypes.string.isRequired,
}

export default Header
