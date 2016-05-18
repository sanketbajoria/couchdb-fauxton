// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
  '../../app',
  '../../core/api',
  'react',
  'react-dom',
  'react-select',
  'lodash'
], (app, FauxtonAPI, React, ReactDOM, ReactSelect, {debounce}) => {

  const JumpToDoc = React.createClass({
    propTypes: {
      database: React.PropTypes.object.isRequired,
      allDocs: React.PropTypes.object.isRequired,
    },
    /*
    This makes me so so so sad,
    basically we have done something wrong with the positioning of our sidebar,
    so the only way to get the dropdown to be visible is to make its position absolute
    and position it relative to the control next to it.
    */
    positionSelect () {
      const el = ReactDOM.findDOMNode(this);
      const dimensions = $('.control-toggle-include-docs')[0].getBoundingClientRect();
      $(el).find('.jump-to-doc').css({
        position: 'absolute',
        left: dimensions.left + 84 + 'px'
      });
    },

    componentDidMount () {
      this.positionSelect();
       window.addEventListener("resize", debounce(() => this.positionSelect(), 150));
    },

    onChange ({value: docId}) {
      var url = FauxtonAPI.urls('document', 'app', app.utils.safeURLName(this.props.database.id), app.utils.safeURLName(docId) );
      FauxtonAPI.navigate(url, {trigger: true});
    },

    render () {
      const {database, allDocs} = this.props;
      const options = allDocs.map(doc => {
        return {
          value: doc.get('_id'),
          label: doc.get('_id')
        };
      });
      return (
        <div id="jump-to-doc" class="input-append">
          <ReactSelect
            name="jump-to-doc"
            placeholder="Document ID"
            className="input-large jump-to-doc"
            options={options}
            clearable={false}
            onChange={this.onChange} />
        </div>
      );
    }
  });

  return {
    JumpToDoc,
    render: (el, database, allDocs) => {
      ReactDOM.render(<JumpToDoc database={database} allDocs={allDocs} />, $(el)[0]);
    }
  };
});
