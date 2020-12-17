import React from 'react';
import ReactQuill from 'react-quill';
import parse from 'html-react-parser';


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorHtml: '', 
      theme: 'snow',
      showOutput: false 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({showOutput: true});
  }

  render() {
    return (
      <div>
        <div>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder="Write something..."
        />
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Submit</button>
        </form>
        </div>

        <div>
          {this.state.showOutput && this.state.editorHtml !== '' ? <div>
              {parse(this.state.editorHtml)}
          </div> : null}
        </div>
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default Editor;