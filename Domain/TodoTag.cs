namespace TodoApp.Domain
{
    public class TodoTag
    {
        public Todo Todo { get; set; }
        public int TodoId { get; set; }
        public Tag Tag { get; set; }
        public string TagId { get; set; }
    }
}