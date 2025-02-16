import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
  <>
    <Head>
      <title>WEB422-app Homepage</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
      
    <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
      <main className={styles.main}>

        {/* Navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-dark-subtle">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold fs-4" href="/">Nilrudra Mukhopadhyay - Movie Data</a>
            <div className="justify-content-end" id="navbarSupportedContent">
              <form className="d-flex" id="searchForm">
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Title (case sensitive)" 
                  aria-label="Search" 
                  id="title"
                />
                <button className="btn btn-success me-md-2" type="submit">Search</button>
                <button className="btn btn-danger" type="reset" id="clearForm">Clear</button>
              </form>
            </div>
          </div>
        </nav>

        <div className="container">
          {/* Table with the main content */}
          <div className="row">
            <div className="col">
              <table className="table table-hover" id="moviesTable">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Title</th>
                    <th>Plot</th>
                    <th>Rating</th>
                    <th style={{ maxWidth: '100px'}}>Run Time</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          {/* Pagination navigation system */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous" id="previous-page">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" id="current-page"></a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next" id="next-page">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Modal window for displaying the movie content once clicked */}
        <div className="modal fade" tabIndex="-1" id="detailsModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title"></h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body"></div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
  );
}
