# Dropzone layout

![](docs/screenshot.png?raw=true)

Custom HTML layout that will be generated for each file by [Dropzone](https://www.dropzonejs.com).

```(html)
<div class="dz-preview dz-file-preview">
    <div class="dz-image"><img data-dz-thumbnail /></div>
    <div class="dz-details">
        <div class="dz-details-info">
            <div class="dz-filename"><span data-dz-name></span></div>
            <div class="dz-size"><span data-dz-size></span></div>
        </div>
        <div class="dz-progress">
            <span class="dz-upload" data-dz-uploadprogress></span>
        </div>
    </div>
    <div class="dz-status-mark"></div>
</div>
```

## Configuration

The basic issue before configuring the [Dropzone](https://www.dropzonejs.com) library is to properly prepare the HTML structure. You must create two containers in the document structure. The first one will serve as a box for selecting files, the second will serve as a list of progress.

```(html)
<div class="dropzone"></div>
<div class="dropzone-preview"></div>
```

Once the structure has been defined, we can begin to configure the [Dropzone](https://www.dropzonejs.com) library.

```(js)
$(function() {
    var myDropzone = $(".dropzone").dropzone({
        url: "#",
        createImageThumbnails: false,
        previewsContainer: ".dropzone-preview",
        previewTemplate: "<div class=\"dz-preview dz-file-preview\"><div class=\"dz-image\"></div><div class=\"dz-details\"><div class=\"dz-details-info\"><div class=\"dz-filename\"><span data-dz-name></span></div><div class=\"dz-size\"><span data-dz-size></span></div></div><div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div></div><div class=\"dz-status-mark\"></div></div>"
                });
            });
```

It is very important to specify the parameters ``previewsContainer`` and ``previewTemplate``. You can find more information in the [documentation](https://www.dropzonejs.com/#configuration).

## Icons

Icons made by [Freepik](https://www.freepik.com), [Hanan](https://www.flaticon.com/authors/hanan) and [Dimitry Miroliubov](https://www.flaticon.com/authors/dimitry-miroliubov) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0)

## License

MIT
