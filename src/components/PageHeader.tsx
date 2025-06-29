import './PageHeader.css'
interface PageHeaderProps {
    pageTitle: string;
}

function PageHeader(props: PageHeaderProps) {

    return (
        <header id="page-header">
            <div className="container">
                <h1>{props.pageTitle}</h1>
            </div>
        </header>
    )
}

export default PageHeader