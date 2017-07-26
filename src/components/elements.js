import React from 'react';




const data = {
    'directories':[
      {
        'type': 'dir',
        'name': 'app',
        'children': [
          {
            'type': 'file',
            'name': 'index.html'
          },
          {
            'type': 'dir',
            'name': 'js',
            'children': [
              {
                'type': 'file',
                'name': 'main.js'
              },
              {
                'type': 'file',
                'name': 'app.js'
              },
              {
                'type': 'file',
                'name': 'misc.js'
              },
              {
                'type': 'dir',
                'name': 'vendor',
                'children': [
                  {
                    'type': 'file',
                    'name': 'jquery.js'
                  },
                  {
                    'type': 'file',
                    'name': 'underscore.js'
                  }
                ]
              }
            ]
          },
          {
            'type': 'dir',
            'name': 'css',
            'children': [
              {
                'type': 'file',
                'name': 'reset.css'
              },
              {
                'type': 'file',
                'name': 'main.css'
              }
            ]
          }
        ]
      },
       {
        'type': 'dir',
        'name': 'app',
        'children': [
          {
            'type': 'file',
            'name': 'index.html'
          },
          {
            'type': 'dir',
            'name': 'js',
            'children': [
              {
                'type': 'file',
                'name': 'main.js'
              },
              {
                'type': 'file',
                'name': 'app.js'
              },
              {
                'type': 'file',
                'name': 'misc.js'
              },
              {
                'type': 'dir',
                'name': 'vendor',
                'children': [
                  {
                    'type': 'file',
                    'name': 'jquery.js'
                  },
                  {
                    'type': 'file',
                    'name': 'underscore.js'
                  }
                ]
              }
            ]
          },
          {
            'type': 'dir',
            'name': 'css',
            'children': [
              {
                'type': 'file',
                'name': 'reset.css'
              },
              {
                'type': 'file',
                'name': 'main.css'
              }
            ]
          }
        ]
      
      
      
      
      
      
      
      
      },
      {
        'type': 'file',
        'name': 'main.js'
      }

    ]
  }





class FolderType extends React.Component{
  constructor(props) {
    super(props);
    this.state = { kids:this.props.data };
    this.state = { hide: true };

    this.handleClick = this.handleClick.bind(this);
  }


  renderFile(){
      return this.props.data.map((file) =><FileType files = {file}/>)
  }

  handleClick(){
    this.state.hide === 'true' ? this.setState({ hide:'false' }) :  this.setState({ hide:'true' })
    const a = this.state.hide;
    console.log(a);
  }
  

  render(){
    return (
     <li  >
      <span className='folder-item' onClick= { this.handleClick.bind(this) } >
        {this.props.name }
      </span>
      {(this.state.hide === 'true') ?
        (<ul> 
          {this.renderFile()} 
        </ul>)
      : (<ul> 
        
      </ul>)
      }
      </li>
    )
  } 
}


class FileType extends React.Component{
  render(){
    if (this.props.files.type === 'file'){
      return (<li className='file-item'>{this.props.files.name}</li>)
    }
      return (<FolderType data={this.props.files.children} name={this.props.files.name}/>)
  } 
}



class InputText extends React.Component{
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }


  render() {
    return (
        <label>
          Filter: 
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
    );
  }
}


export default class Tree extends React.Component{
  constructor() {
    super();
    this.state = {
      show: '',
      arr:data.directories
    };
  }

  listFilter(obj, value, arr){
    if ( obj.type === 'file'){
      if ( obj.name.includes(value)) {
        arr.push(obj)
    }
    
  }
  if ( obj.type === 'dir' ){
    if ( obj.name.includes(value)) {
      arr.push(obj)
    }
     obj.children.map((file) => arr.concat(this.listFilter(file, value, arr)));
    
  }
  }

  handleChange(value){
    this.setState({ show:value });
    var arrr = [];
    data.directories.map((file)=>this.listFilter(file, value, arrr));
    this.setState( { arr:arrr } );
  }


  render(){
      return ( 
          <div className="folder-container">
            <InputText onChange={this.handleChange.bind(this)}/>

            {this.state.show.length === 0 ?
              (<ul className="ul-container">
                 {data.directories.map((file)=> 
                <FileType files = {file}/>)}
              </ul>) :
            
             (<ul className="ul-container">
                {this.state.arr.length === 0 ?
                 null :
                 this.state.arr.map((file)=>
                  <FileType files = {file}/>)}
            </ul>)
            
            }
         </div>
        
      )
    
  }
}


