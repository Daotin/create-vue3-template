// hash.js
importScripts('./spark-md5.min.js') // 请确保路径是正确的

self.onmessage = function (e) {
  const { fileRaw, chunks } = e.data;
  const hashes = [];

  let progress = 0;
  // 获取每一块文件的hash
  for (const chunk of chunks) {
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReaderSync();
    const arrayBuffer = reader.readAsArrayBuffer(chunk.file);
    spark.append(arrayBuffer);
    const hash = spark.end();
    hashes.push(hash);
    progress++;
    self.postMessage({ progress: (progress / chunks.length) * 100 });
  }

  // 获取完整文件的hash
  const spark = new SparkMD5.ArrayBuffer();
  const reader = new FileReaderSync();
  const arrayBuffer = reader.readAsArrayBuffer(fileRaw);
  spark.append(arrayBuffer);
  const hash = spark.end();
  self.postMessage({ fileHash: hash });

  self.postMessage({ hashes });
};
