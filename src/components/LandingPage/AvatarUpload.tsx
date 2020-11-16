import React, {useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Upload, message } from 'antd';
import {RcFile, UploadChangeParam} from 'antd/es/upload';
import gql from "graphql-tag";
import {getSignedUrlForPhotoUpload2} from '../../graphql/queries';
import client from '../../graphql/apollo';

function getBase64(img: Blob | File | undefined, callback: (result: string | ArrayBuffer | null) => any) {
    if (img === undefined) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function AvatarUpload() {
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        console.log('####', isJpgOrPng && isLt2M);
        return isJpgOrPng && isLt2M;
    }

    const handleChange = async (info: UploadChangeParam) => {
        console.log('info', info.file.status)
        if (info.file.status === 'uploading') {
            setIsLoading(true);
            return;
        }
        if (info.file.status === 'error') {
            console.log('HANDLE CHANGE ERROR:', info.file.error)
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log('33')
            getBase64(info.file.originFileObj, (imageUrl) => {
                    setImageUrl(imageUrl as string);
                    setIsLoading(false);
                }
            );
        }
    };

    // @ts-ignore
    const uploadAvatar = async (a) => {

        console.log('uploadAvatar CALLED!')
        console.log(a);

        const data = await client.query({
            query: gql(getSignedUrlForPhotoUpload2),
            variables: {input: {fileType: 'jpeg'}}
        })

        console.log('####', data);

        const s3SignedUrl = data.data.getSignedUrlForPhotoUpload2.url;
        console.log(s3SignedUrl);
        try {

            const res = await fetch(s3SignedUrl, {
                method: 'PUT',
                body: a.file,
                headers: {
                    'Content-Type': 'image/jpeg',
                }
            })
            console.log('RES:', res);
            console.log(await res.text())
            a.onSuccess()
        } catch (e) {
            console.log('ERROR UPLOADING:', e);
            a.onError()
        }

    }

    const uploadButton = (
        <div>
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action={uploadAvatar}
            customRequest={uploadAvatar}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )
}

export default AvatarUpload;
