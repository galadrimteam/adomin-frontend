import { readAndCompressImage } from "browser-image-resizer";
import { makeAutoObservable } from "mobx";

interface FileInputOptions {
  inputText: string;
  imageParams?: {
    imageAlt: string;
  };
}

export class FileStore {
  public file: File | null = null;

  public resizedBlob: Blob | null = null;

  public visited = false;

  public fileSrc: string | null = null;

  public shouldResize: boolean;

  public fileName?: true;

  public resizeConfig = {
    quality: 0.5,
    maxWidth: 1200,
    maxHeight: 800,
  };

  public inputOptions: FileInputOptions;

  private onChangeCallback?: (file: File | null) => void = undefined;

  constructor({
    url,
    shouldResize,
    maxWidth,
    maxHeight,
    onChangeCallback,
    inputOptions,
  }: {
    url?: string;
    shouldResize?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    onChangeCallback?: (file: File | null) => void;
    inputOptions?: FileInputOptions;
  } = {}) {
    this.onChangeCallback = onChangeCallback;
    this.fileSrc = url ?? null;
    this.shouldResize = shouldResize ?? false;
    if (maxWidth) this.resizeConfig.maxWidth = maxWidth;
    if (maxHeight) this.resizeConfig.maxHeight = maxHeight;
    this.inputOptions = inputOptions ?? { inputText: "Upload file" };
    makeAutoObservable(this);
  }

  setFileSrc(state: string) {
    this.fileSrc = state;
  }

  setResizedBlob(blob: Blob | null) {
    this.resizedBlob = blob;
  }

  setFile(file: File | null) {
    this.file = file;
    this.onChangeCallback?.(file);
    const isResizableImage =
      file?.type === "image/png" || file?.type === "image/jpeg";
    if (!file || !isResizableImage) {
      this.setResizedBlob(null);
      return;
    }
    readAndCompressImage(file, this.resizeConfig).then((resizedImage) => {
      if (this.shouldResize) {
        this.setResizedBlob(resizedImage);
      }
      this.readDataUrl(file);
    });
  }

  readDataUrl(file: File) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (reader.result) {
          this.setFileSrc(reader.result.toString());
        }
      },
      false
    );
    reader.readAsDataURL(file);
  }

  setUploadedFile(input: HTMLInputElement) {
    const image: File | null =
      input.files && input.files.length >= 1 ? input.files[0] : null;
    this.setFile(image);
  }

  setVisited(state: boolean) {
    this.visited = state;
  }

  onBlur() {
    this.setVisited(true);
  }

  reset() {
    this.setFile(null);
  }
}
