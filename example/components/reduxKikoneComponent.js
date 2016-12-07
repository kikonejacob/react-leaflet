import KikoneComponent from './kikoneComponent'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    shapes: state
  }
}

/** will later one connect with mapStateToProps */
export default connect(mapStateToProps)(KikoneComponent)

