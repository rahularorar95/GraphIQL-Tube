import React, {
	Component
} from 'react';

class Input extends Component {


	render() {

		const handle = (e) => {
			e.preventDefault()
			this.props.onClickSearch(this.input.value)
		}

		return (
                <div className="outer-input" >
                    <form onSubmit={handle}>
                        <div className="input">
                            <input type="text" name="name" className="question" autoFocus ref={input=>this.input=input} id="nme" required />
                            <label htmlFor="nme"><span>Search Youtube...</span></label>
                        </div>
                        <div className="search-button">
                            <button className="button">Search</button>
                        </div>
                    </form>
                    </div>

		)
	}
}

export default Input;