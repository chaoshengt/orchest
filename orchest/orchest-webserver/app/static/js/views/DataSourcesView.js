import React, { Fragment } from 'react';
import MDCIconButtonToggleReact from "../mdc-components/MDCIconButtonToggleReact";
import DataSourceEditView from "./DataSourceEditView";
import CheckItemList from '../components/CheckItemList';
import { makeRequest } from '../utils/all';
import MDCLinearProgressReact from '../mdc-components/MDCLinearProgressReact';

class DataSourcesView extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      "datasources": undefined,
    }
  }

  componentDidMount(){

    this.fetchDataSources();

  }

  fetchDataSources(){

    // in case checkItemList exists, clear checks
    if(this.refs.checkItemList){
      this.refs.checkItemList.deselectAll();
    }

    // fetch data sources
    makeRequest("GET", "/store/datasources").then((result) => {
      try {
        let json = JSON.parse(result);

        this.setState({
          "dataSources": json
        })
        
      } catch (error) {
        console.log(error);
        console.log("Error parsing JSON response: ", result);
      }
      
    }).catch((err) => {
      console.log("Error fetching DataSources", err);
    });
  }

  onCreateClick(){

    orchest.loadView(DataSourceEditView);

  }

  onDeleteClick(){

    console.log("Stub: deleting...");
    console.log()

    // select indices

    let selectedIndices = this.refs.checkItemList.customSelectedIndex();

    orchest.confirm("Warning", "Are you sure you want to delete the selected data sources? (This cannot be undone.)", () => {
      let promises = [];
      for(let x = 0; x < selectedIndices.length; x++){
        promises.push(makeRequest("DELETE", "/store/datasources/" + this.state.dataSources[selectedIndices[x]].name));
      }

      Promise.all(promises).then(() => {
        this.fetchDataSources();
      });
    })

  }

  onClickListItem(dataSource, e){
    orchest.loadView(DataSourceEditView, {"dataSource": dataSource});
  }

  render() {
    return <div className={"view-page"}>
      <h2>Data sources</h2>

      {(() => {
        if(this.state.dataSources){
          return <Fragment>
              <div className={"data-source-actions"}>
                <MDCIconButtonToggleReact icon="add" onClick={this.onCreateClick.bind(this)} />
                <MDCIconButtonToggleReact icon="delete" onClick={this.onDeleteClick.bind(this)} />
              </div>
              <CheckItemList ref="checkItemList" items={this.state.dataSources} onClickListItem={this.onClickListItem.bind(this)} />
            </Fragment>
        }else{
          return <MDCLinearProgressReact />
        }
      })()}
      
    </div>;
  }
}

export default DataSourcesView;