import  { useState } from 'react'
import useShowToast from './useShowToast';

function usePreviewImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxSizeBytes = 2*1024*1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Check if file has Image format only
    if(file && file.type.startsWith("image/")){
        if(file.size > maxSizeBytes){
            showToast("Error", "Please select Image less than 2MB", "error");
            setSelectedFile(null);
            return;
        }
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        }
        reader.readAsDataURL(file);
        
    } else {
        showToast("Error","Please select File of Image type only", "error");
        setSelectedFile(null);
    }
  }

    return {selectedFile, handleImageChange, setSelectedFile}
}

export default usePreviewImage