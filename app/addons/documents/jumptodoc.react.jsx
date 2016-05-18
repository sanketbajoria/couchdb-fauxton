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
], (app, FauxtonAPI, React, ReactDOM, ReactSelect) => {

  const JumpToDoc = ({database, allDocs}) => {
    const options = allDocs.map(doc => {
      return {
        value: doc.get('_id'),
        label: doc.get('_id')
      };
    });
    console.log('op', options);
    return (
      <div id="jump-to-doc-wrapper" class="input-append">
        <ReactSelect
          name="jump-to-doc"
          placeholder="Document ID"
          className="input-large"
          options={options}
          clearable={false}
          onChange={(val) => {console.log('bbb', val);}} />
      </div>
    );
  };

  return {
    JumpToDoc,
    render: (el, database, allDocs) => {
      ReactDOM.render(<JumpToDoc database={database} allDocs={allDocs} />, $(el)[0]);
    }
  };
});
