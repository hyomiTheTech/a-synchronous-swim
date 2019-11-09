(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  // // STEP 1: create ajax request for 'GET'
  // const ajaxGet = (data) => {
  //   // var formData = new FormData();
  //   // formData.append('file', file);
  //   $.ajax({
  //     type: 'GET',
  //     // data: formData,
  //     url: serverUrl,
  //     // cache: false,
  //     // contentType: 'string',
  //     // processData: false,
  //     success: (data) => {
  //       // console.log("Get is Success")
  //       // reload the page
  //       // window.location = window.location.href;
  //       SwimTeam.move(data);
  //     }
  //   });
  // };
  // setInterval(() => ajaxGet(), 5000);


  const ajaxGet = (data) => {

    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        // console.log("Get is Success")
        SwimTeam.move(data);
        // console.log(data);
      }
    });
  };

  setInterval(() => ajaxGet(), 5000);

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        console.log("Post is Success")
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
