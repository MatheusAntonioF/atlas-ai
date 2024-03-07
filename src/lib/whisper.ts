export const whisperOptions = {
  modelName: "base.en", // default
  whisperOptions: {
    language: "auto", // default (use 'auto' for auto detect)
    gen_file_txt: false, // outputs .txt file
    gen_file_subtitle: true, // outputs .srt file
    gen_file_vtt: false, // outputs .vtt file
    word_timestamps: true, // timestamp for every word
  },
};
