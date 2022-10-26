import { Component, EventEmitter, Input, Output, } from '@angular/core';

@Component({
  selector: 'compass-ui-cw-upload',
  templateUrl: './cw-upload.component.html',
  styleUrls: ['./cw-upload.component.scss']
})
export class CwUploadComponent {
    @Input() fieldId: string = '';
    @Input() buttonLabel: string = '';
    @Input() uploadText: string = '';
    @Input() displayError: boolean | undefined;
    @Input() errorText: string = '';
    @Input() fileType: any[] = [];
    @Output() getFile = new EventEmitter<any>();
    
    ngOnInit() {}

    readFile(fileEvent: any) {
        const file = this.getExtension(fileEvent.target.files[0].name);
        switch (file) {
            case "jpg": this.getFile.emit(fileEvent.target.files[0]);
                break;
            case "jpeg": this.getFile.emit(fileEvent.target.files[0]);
                break;
            case "tif": this.getFile.emit(fileEvent.target.files[0]);
                break;
            case "tiff": this.getFile.emit(fileEvent.target.files[0]);
                break;
            case "pdf": this.getFile.emit(fileEvent.target.files[0]);
                break;
            case "png": this.getFile.emit(fileEvent.target.files[0]);
                break;
            case "bmp": this.getFile.emit(fileEvent.target.files[0]);
                break;
            default:
                this.getFile.emit('wrongfiletype');
                break;
        }
    }

    getExtension(filename: any) {
        let parts = filename.split('.');
        return parts[parts.length - 1];
    }

}