import Form from './form/Form';
import Joi from 'joi-browser';

class Sorting extends Form {
    state = {
        data: { sortBy: '' },
        errors: {},
        options: [
            { id: 'name', 'name': 'Name' },
            { id: 'popularity', 'name': 'Popularity' },
            { id: 'vote_count', 'name': 'Vote Count' },
        ]
    }

    schema = {
        sortBy: Joi.string()
            .label('Genre')
            .required(),
    }

    render() {
        return (
            <div>
                <form className='flex justify-center items-center' >
                    {this.renderSelect('sortBy', 'Sort By', this.state.options)}
                    {this.renderButton('Filter', 'bg-black px-6 py-2 rounded-lg mx-2')}
                </form>
            </div>
        );
    }
}

export default Sorting;