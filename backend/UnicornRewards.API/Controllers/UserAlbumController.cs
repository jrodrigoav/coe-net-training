using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Interface;
using Document = iText.Layout.Document;

namespace UnicornRewards.API.Controllers
{
    [ApiController, Route("api/userAlbum"), AllowAnonymous]
    public class UserAlbumController : ControllerBase
    {
        public readonly IUserAlbumService _userAlbumService;

        public UserAlbumController(IUserAlbumService userAlbumService)
        {
            _userAlbumService = userAlbumService;
        }

        [Authorize, HttpGet("getAllAlbums/{message}")]
        public async Task<IActionResult> GetUserAlbum()
        {
            var result = await _userAlbumService.GetAllUserAlbums();
            return Ok(result);
        }

        [Authorize, HttpGet("getPdf")]

        public FileStreamResult GetPDF()
        {
            var result = createPDF();
            return result;// Ok(result);
        }

        private FileStreamResult createPDF()
        {
            MemoryStream ms = new MemoryStream();
            PdfWriter pw = new PdfWriter(ms);
            PdfDocument pdfDocument = new PdfDocument(pw);
            PdfPage page = pdfDocument.AddNewPage();
            Document document = new Document(pdfDocument);
            document.SetMargins(60,35, 35, 35);

            #region Header

            string imagePath = System.IO.Path.Combine("Content/logo_unosquare.png");
            ImageData logo = ImageDataFactory.Create(imagePath);

            Image image = new Image(logo).ScaleAbsolute(100, 100).SetFixedPosition(1,470,745);
            document.Add(image);

            Color blueColor = new DeviceCmyk(99, 79, 0, 0);
            Rectangle rectangle = new Rectangle(35, page.GetPageSize().GetTop(), 740, 150);
            Canvas canvas = new Canvas(page, rectangle);

            canvas.ShowTextAligned(new Paragraph(new Text("Jose Perez Lopez").SetBold().SetCharacterSpacing(2)).SetFontSize(25).SetFontColor(ColorConstants.BLACK), 35, 790, TextAlignment.LEFT)
                .ShowTextAligned(new Paragraph(new Text(".NET Software Developer").SetBold().SetCharacterSpacing(1)).SetFontSize(10).SetFontColor(blueColor), 35, 775, TextAlignment.LEFT)
                .ShowTextAligned(new Paragraph(new Text("jose.perez@unosquare.com")).SetFontSize(12).SetFontColor(ColorConstants.DARK_GRAY), 35, 758,TextAlignment.LEFT)
                .Close();

            #endregion

            #region Profile
            var profile = new Paragraph(new Text("PROFILE").SetBold().SetCharacterSpacing(2)).SetFontSize(12).SetFontColor(ColorConstants.DARK_GRAY).SetMarginTop(40);
            var description = new Paragraph("Software Developer with 11 years of proven experience on software development, primarily using .NET technologies, for Web, Cloud and Desktop platforms. Broad knowledge of C# language and JavaScript, along with SQL Server databases, as well as resource management, development, and deployment on Microsoft Azure.")
                                  .SetFontSize(10).SetFontColor(ColorConstants.DARK_GRAY).SetTextAlignment(TextAlignment.JUSTIFIED);
            document.Add(profile);
            document.Add(description);
            #endregion

            #region Technical Skills

            var techenicalSkills = new Paragraph(new Text("TECHNICAL SKILLS").SetBold().SetCharacterSpacing(2)).SetFontSize(12).SetFontColor(ColorConstants.DARK_GRAY).SetMarginTop(10);
            document.Add(techenicalSkills);

            Color tableHeaderColor = new DeviceCmyk(3, 4, 4, 4);
            float[] columnWidths = { 400f, 200f, 200f };
            Table table = new Table(columnWidths); // Table(UnitValue.CreatePercentArray(new float[] { 15, 15, 15 }));

            Cell techologiesCell = new Cell(1, 0).SetVerticalAlignment(VerticalAlignment.MIDDLE).SetBorder(Border.NO_BORDER).SetBackgroundColor(tableHeaderColor).Add(new Paragraph(new Text("TECHNOLOGIES:").SetFontSize(9).SetBold().SetCharacterSpacing(1)));
            Cell methodologiesCell = new Cell(1, 1).SetVerticalAlignment(VerticalAlignment.MIDDLE).SetBorder(Border.NO_BORDER).SetBackgroundColor(tableHeaderColor).Add(new Paragraph(new Text("METODOLOGIES:").SetFontSize(9).SetBold().SetCharacterSpacing(1)));
            Cell certificationsCell = new Cell(1, 1).SetVerticalAlignment(VerticalAlignment.MIDDLE).SetBorder(Border.NO_BORDER).SetBackgroundColor(tableHeaderColor).Add(new Paragraph(new Text("CERTIFICATIONS:").SetFontSize(9).SetBold().SetCharacterSpacing(1)));

            // header table
            table.AddHeaderCell(techologiesCell);
            table.AddHeaderCell(methodologiesCell);
            table.AddHeaderCell(certificationsCell);

            float[] cellThechnologiesWidth = { 200f, 200f };
            Table techologiesCellTable = new Table(cellThechnologiesWidth);
            for (int i = 0; i < 4; i++)
            {
                var p = new Paragraph(new Text("\u2022").SetBold().SetFontColor(blueColor));
                p.Add(new Text("  "));
                p.Add(new Text("This should be line 1, and it is!~").SetFontSize(10));
                Cell tableOne = new Cell().SetBorder(Border.NO_BORDER).Add(p);
                techologiesCellTable.AddCell(tableOne);
                techologiesCellTable.AddCell(new Paragraph("This should be line 2, and it is!~")).SetBorder(Border.NO_BORDER);
            }
            table.AddCell(techologiesCellTable).SetBorder(Border.NO_BORDER);


            ///////////////////////////////////////
            table.AddCell("SCRUM");

            ///////////////////////////////////////
            table.AddCell(new Paragraph("Microsoft Certified Professional (MCID 12311731) ")).SetBorder(Border.NO_BORDER);
            document.Add(table);

            #endregion

            #region Work Experience

            var workExperience = new Paragraph(new Text("WORK EXPERIENCE ").SetBold().SetCharacterSpacing(2)).SetFontSize(12).SetFontColor(ColorConstants.DARK_GRAY).SetMarginTop(10);
            document.Add(workExperience);

            float[] workExperienceWidth = { 800f };
            Table workExperienceTable = new Table(workExperienceWidth);

            var message = "Currently assigned to the .NET Center of Excellence. Here we are working on different areas of improvement in the C# language as well as consolidating and learning new features of the .NET platform.";

            Style titleStyle = new Style();
            titleStyle.SetBold().SetFontColor(blueColor).SetCharacterSpacing(1).SetFontSize(11);
            string compayName = "Unosquare";
            string projectName = ".NET Center of Excellence";
            string from = "March/2021";
            string to = "September/2021";
            string fullDate = $"({from} - {to})";
            var fullTitle = new Paragraph(new Text(compayName).AddStyle(titleStyle));
            fullTitle.Add(new Text($" {projectName} ").AddStyle(titleStyle));
            fullTitle.Add(new Text(fullDate).SetBold().SetCharacterSpacing(1).SetFontSize(11));


            Cell title = new Cell(1, 0).Add(fullTitle).SetBorder(Border.NO_BORDER);
            Cell twoCell = new Cell(1, 0).Add(new Paragraph(new Text("Software Engineer").SetBold().SetFontSize(9).SetItalic().SetCharacterSpacing(1))).SetBorder(Border.NO_BORDER);
            Cell threeCell = new Cell(1, 0).Add(new Paragraph(new Text(message).SetFontSize(10).SetFontColor(ColorConstants.DARK_GRAY).SetTextAlignment(TextAlignment.JUSTIFIED))).SetBorder(Border.NO_BORDER);

            workExperienceTable.AddCell(title);
            workExperienceTable.AddCell(twoCell);
            workExperienceTable.AddCell(threeCell);
            workExperienceTable.SetMarginTop(15);

            for (int i = 0; i < 6; i++)
            {
                document.Add(workExperienceTable);
            }


            #endregion

            #region Education

            var education = new Paragraph(new Text("EDUCATION ").SetBold().SetCharacterSpacing(2)).SetFontSize(12).SetFontColor(ColorConstants.DARK_GRAY).SetMarginTop(10);
            document.Add(education);

            float[] educationWidth = { 800f };
            Table educationTable = new Table(educationWidth);

            string degree = "Licenciatura";
            string major = "Software engineer";
            string universityName = "UNAM";
            string yearOfCompletion = "2018";
            string fullEducationTitle = $"{universityName} - {major}";
            string fullSubtitle = $"{degree} - {yearOfCompletion}";
            var pFullEducation = new Paragraph(new Text(fullEducationTitle).SetBold().SetCharacterSpacing(1).SetFontSize(11)).SetFontColor(blueColor);
            var pFullSubtitle = new Paragraph(new Text(fullSubtitle).SetBold().SetCharacterSpacing(1).SetFontSize(8));

            Cell titleEducation = new Cell(1, 0).Add(pFullEducation).SetBorder(Border.NO_BORDER);
            Cell twoCellEducation = new Cell(1, 0).Add(pFullSubtitle).SetBorder(Border.NO_BORDER);

            educationTable.AddCell(titleEducation);
            educationTable.AddCell(twoCellEducation);
            educationTable.SetMarginTop(15);

            for (int i = 0; i < 3; i++)
            {
                document.Add(educationTable);
            }

            #endregion

            document.Close();

            #region Streams
            byte[] byteStream = ms.ToArray();

            ms = new MemoryStream();
            ms.Write(byteStream, 0, byteStream.Length);
            ms.Position = 0;
            return new FileStreamResult(ms, "application/pdf") { FileDownloadName = "test"};
            #endregion
        }

    }
}
