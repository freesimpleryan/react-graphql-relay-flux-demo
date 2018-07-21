import React from "react";
import PropTypes from 'prop-types';
import Relay from 'react-relay/classic';
import Link from "./Link"

class Main extends React.Component{

    render() {
        let content = this.props.store.links.map(link => {
            return <Link key={link._id} link={link} />
        });
        return <div>
            <h3>Links</h3>
            <ul>
                {content}
            </ul>
        </div>;
    }

}

// Declaration of data requirement
Main = Relay.createContainer(Main, {
   fragments: {
       store: () => Relay.QL`
       fragment on Store {
        links {
            _id,
            ${Link.getFragment('link')}
        }
       }
       `
   }
});


export default Main;