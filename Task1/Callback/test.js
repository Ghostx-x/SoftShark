function downloadFile(url, callback) {
    console.log("Downloading...")
    setTimeout(() => {
        const fileContext =`file data ${url}`;
        callback(fileContext);
    }, 2000);

}

function saveFile(context, callback){
    console.log("Saving...")
    setTimeout(() => {
    const savedfileContext =`saved file data ${context}`;
    callback(savedfileContext)
    },2000)
}

downloadFile("report.txt", (content) => {
    console.log("Downloaded ", content);
    saveFile(content, (savedCntent) => {
        console.log("Saved ", savedCntent)
    })
}); 