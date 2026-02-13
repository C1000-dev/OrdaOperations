// FILE UPLOAD SYSTEM - Drag & Drop + Base64 Storage
function createFileDropzone(elementId, fileTypes, onFileLoaded) {
    const dropzone = document.getElementById(elementId);
    if (!dropzone) return;
    
    dropzone.innerHTML = `
        <div class="file-dropzone">
            <input type="file" id="${elementId}-input" accept="${fileTypes}" style="display:none">
            <div class="drop-area" id="${elementId}-drop">
                <div class="drop-icon">📁</div>
                <div class="drop-text">Drop file here or click to browse</div>
                <div class="drop-hint">Accepted: ${fileTypes}</div>
            </div>
            <div class="file-preview" id="${elementId}-preview" style="display:none"></div>
        </div>
    `;
    
    const input = document.getElementById(elementId + '-input');
    const dropArea = document.getElementById(elementId + '-drop');
    const preview = document.getElementById(elementId + '-preview');
    
    dropArea.onclick = () => input.click();
    
    dropArea.ondragover = (e) => {
        e.preventDefault();
        dropArea.style.borderColor = '#fff';
        dropArea.style.background = 'rgba(255,255,255,0.1)';
    };
    
    dropArea.ondragleave = () => {
        dropArea.style.borderColor = 'rgba(255,255,255,0.2)';
        dropArea.style.background = 'transparent';
    };
    
    dropArea.ondrop = (e) => {
        e.preventDefault();
        dropArea.style.borderColor = 'rgba(255,255,255,0.2)';
        dropArea.style.background = 'transparent';
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    
    input.onchange = (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };
    
    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            dropArea.style.display = 'none';
            preview.style.display = 'block';
            
            if (file.type.startsWith('image/')) {
                preview.innerHTML = `<img src="${base64}" style="max-width:200px;max-height:200px"><br><button onclick="clearFile('${elementId}')">Remove</button>`;
            } else if (file.type.startsWith('audio/')) {
                preview.innerHTML = `<audio src="${base64}" controls></audio><br><button onclick="clearFile('${elementId}')">Remove</button>`;
            } else if (file.type.startsWith('video/')) {
                preview.innerHTML = `<video src="${base64}" controls style="max-width:300px"></video><br><button onclick="clearFile('${elementId}')">Remove</button>`;
            } else {
                preview.innerHTML = `File: ${file.name}<br><button onclick="clearFile('${elementId}')">Remove</button>`;
            }
            
            onFileLoaded(base64, file.type, file.name);
        };
        reader.readAsDataURL(file);
    }
}

window.clearFile = function(elementId) {
    document.getElementById(elementId + '-drop').style.display = 'block';
    document.getElementById(elementId + '-preview').style.display = 'none';
};
