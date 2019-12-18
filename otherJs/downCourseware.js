var thisType = handle.extension.toLocaleLowerCase(),
handelThis = handle;
switch (thisType) {
    case "txt":
        handelThis.makefile = 10; //txt
        break;
    case "swf":
        handelThis.makefile = 7; //falsh
        break;
    case "pdf":
        handelThis.makefile = 8; //pdf
        break;
    case "xls":
    case "xlsx":
        handelThis.makefile = 9; //excle
        break;
    case "ppt":
    case "pptx":
        handelThis.makefile = 2; //ppt
        break;
    case "doc":
    case "docx":
    case "wps":
        handelThis.makefile = 3; //word
        break;
    case "au":
    case "m3u":
    case "mid":
    case "midi":
    case "mp2":
    case "mp3":
    case "mpa":
    case "mpga":
    case "rm":
    case "snd":
    case "wav":
        handelThis.makefile = 5; //mp3
        break;
    case "bmp":
    case "gif":
    case "ico":
    case "jpe":
    case "jpeg":
    case "jpg":
    case "jps":
    case "png":
    case "rgb":
    case "tif":
    case "tiff":
    case "x-png":
        handelThis.makefile = 6; //图片
        break;
    case "avi":
    case "mov":
    case "mp4":
    case "mpeg":
    case "mpg":
    case "mv":
    case "mkv":
    case "wmv":
        handelThis.makefile = 4; //视频
        break;
    default:
        handelThis.makefile = 1;
}