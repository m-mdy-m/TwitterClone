export function PostContent({ content, edit_mode, profile_mode }) {
  const wrapperContent = (
    contentTweet = `<p class="w-full" id="content-tweet">${content}</p>`
  ) => {
    return `
    <div class="flex justify-start items-center py-3 w-full break-words">
        <div id="wrapperContentTweet" class="flex justify-start items-center w-full h-full text-white text-base font-Aktiv__regular ">
            ${contentTweet}
        </div>
    </div>
    `;
  };
  let template = wrapperContent();
  if (edit_mode) {
    template = wrapperContent(
      `<textarea id="editContent" class="pr-7 h-auto w-full bg-transparent  rounded-l-xl px-1 py-2 border-r-transparent border-l-transparent text-white outline-none transition-all resize-none overflow-y-hidden">${content}</textarea>`
    );
  }
  if (profile_mode) {
    const truncateContent = (content) => {
      const MAX_CONTENT_LENGTH = 110;
      if (content.length > MAX_CONTENT_LENGTH) {
        const truncatedContent = content.slice(0, MAX_CONTENT_LENGTH);
        return `${truncatedContent}...more`;
      } else {
        return content;
      }
    };
    template = wrapperContent(`<p class="w-full" id="content-tweet">${truncateContent(content)}</p>`);
  }
  return template;
}
