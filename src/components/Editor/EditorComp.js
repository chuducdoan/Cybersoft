import { Editor } from '@tinymce/tinymce-react';
import {memo} from 'react';

function EditorComp({handleChangeEdit, initialValue}) {
    return ( 
        <Editor
            name="description"
            initialValue={initialValue ? initialValue : ''}
            init={{
            height: 300,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleChangeEdit}
        />
     );
}

export default memo(EditorComp);