import ReactQuill from 'react-quill';
import React from "react"

const RichTextEditor = (props) => {
    return (
        <div className={'flex flex-col gap-1 min-h-[200px] '}>
            <label className="text-lg font-semibold">{props.header}</label>
            <ReactQuill
                className={' dark:text-gray-100 pb-[66px] h-80 dark:bg-darkSecondary'}
                placeholder={props.placeholder}
                modules={{
                    toolbar: {
                        container: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ align: [] }],
                            ['link', 'image'],
                            ['clean'],
                            [{ color: [] }]
                        ]
                        // handlers: {
                        //     image: this.imageHandler
                        // }
                    }
                }}
                theme="snow"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default RichTextEditor;
